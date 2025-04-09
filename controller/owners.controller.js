const { errorHandler } = require("../helpers/error_handler");
const Owners = require("../models/owners.models");
const ownerValidation = require("../validations/owners.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const jwtService = require("../services/jwt.service");
const mailService = require("../services/mail.service");
const uuid = require("uuid");

const addNewOwner = async (req, res) => {
  try {
    const { full_name, phone_number, email, password, organization_name } =
      req.body;

    const { error } = ownerValidation.validate({
      full_name,
      phone_number,
      email,
      password,
      organization_name,
    });
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const existing = await Owners.findOne({ where: { email } });
    if (existing) {
      return res.status(409).send({ message: "Email alredy exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activation_link = uuid.v4();

    const newOwner = await Owners.create({
      full_name,
      phone_number,
      email,
      password: hashedPassword,
      organization_name,
      activation_link,
    });

    await mailService.sendActivationMail(
      newOwner.email,
      `${config.get("api_url")}/api/owner/activate/${activation_link}`
    );

    const payload = {
      id: newOwner.id,
      email: newOwner.email,
      full_name: newOwner.full_name,
      role: "owner",
    };

    const tokens = jwtService.generateTokens(payload);

    res.status(201).send({
      message: "New owner added",
      newOwner,
      accessToken: tokens.accesstoken,
      refreshTokenClients: tokens.refreshtoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateOwner = async (req, res) => {
  try {
    const owner = await Owners.findOne({
      where: { activation_link: req.params.link },
    });
    if (!owner) {
      return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
    }

    const payload = {
      id: owner.id,
      email: owner.email,
      full_name: owner.full_name,
      role: "owner",
    };

    const tokens = jwtService.generateTokens(payload);

    owner.is_active = true;
    owner.refresh_token = tokens.refreshtoken;
    await owner.save();

    res.cookie("refreshTokenOwner", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Foydalanuvchi faollashtirildi",
      status: owner.is_active,
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//---------------------------------------------------------------------

const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owners.findOne({ where: { email } });

    if (!owner) {
      return res.status(404).send({ message: "Email yoki password noto'gri " });
    }

    const valiPassword = bcrypt.compareSync(password, owner.password);
    if (!valiPassword) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }

    const payload = {
      id: owner.id,
      email: owner.email,
      full_name: owner.full_name,
      role: "owner",
    };

    const tokens = jwtService.generateTokens(payload);
    owner.refresh_token = tokens.refreshtoken;
    await owner.save();
    res.cookie("refreshTokenOwner", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.status(200).send({
      message: "Owner login successful",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutOwner = async (req, res) => {
  try {
    const { refreshTokenOwner } = req.cookies;
    if (!refreshTokenOwner) {
      return res.status(400).send({ message: "Refresh token not found" });
    }

    const owner = await Owners.findOne({
      where: { refresh_token: refreshTokenOwner },
    });
    if (!owner) {
      return res.status(404).send({ message: "Owner not found" });
    }

    await owner.update({ refresh_token: null });

    res.clearCookie("refreshTokenOwner");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const refreshTokenOwner = async (req, res) => {
  try {
    const { refreshTokenOwner } = req.cookies;

    if (!refreshTokenOwner) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    // const decodedRefreshToken = await jwtService.verifyRefreshToken(
    //   refreshTokenOwner
    // );
    const owner = await Owners.findOne({ refresh_token: refreshTokenOwner });
    if (!owner) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: owner.id,
      email: owner.email,
      full_name: owner.full_name,
      role: "owner",
    };

    const tokens = jwtService.generateTokens(payload);
    owner.refresh_token = tokens.refreshtoken;
    await owner.save();
    res.cookie("refreshTokenOwner", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.send({
      message: "Tokenlar yangilandi",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//----------------------------------------------------------------------

const getAllOwners = async (req, res) => {
  try {
    const owners = await Owners.findAll();
    res.status(200).send({ owners });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owners.findByPk(id);
    if (!owner) {
      return res.status(404).send({ message: "Owner not found" });
    }
    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      phone_number,
      email,
      password,
      refresh_token,
      organization_name,
    } = req.body;

    const { error } = ownerValidation.validate(req);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const owner = await Owners.findByPk(id);
    if (!owner) {
      return res.status(404).send({ message: "Owner not found" });
    }

    await owner.update({
      full_name,
      phone_number,
      email,
      password,
      refresh_token,
      organization_name,
    });

    res.status(200).send({
      message: "Owner updated successfully",
      owner,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owners.findByPk(id);
    if (!owner) {
      return res.status(404).send({ message: "Owner not found" });
    }

    await Owners.destroy({ where: { id } });

    res.status(200).send({
      message: "Owner deleted successfully",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewOwner,
  loginOwner,
  logoutOwner,
  refreshTokenOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
  activateOwner,
};
