const { errorHandler } = require("../helpers/error_handler");
const Admins = require("../models/admin.models");
const JwtService = require("../services/jwt.service");
const adminSchema = require("../validations/admin.validation");
const bcrypt = require("bcrypt");
const config = require("config");

//------------------------------------------------------

//--------------------------------------------------------

const addNewAdmin = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      phone_number,
      assigned_region_id,
      is_creater,
    } = req.body;

    const { error } = adminSchema.validate({
      full_name,
      email,
      password,
      phone_number,
      assigned_region_id,
      is_creater,
    });

    if (error) {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.details });
    }

    const existing = await Admins.findOne({ where: { email } });
    if (existing) {
      return res.status(409).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admins.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
      assigned_region_id,
      is_creater,
    });

    const payload = {
      id: newAdmin.id,
      phone_number: newAdmin.phone_number,
      is_creater: newAdmin.is_creater,
      role: "admin",
    };
    const tokens = JwtService.generateTokens(payload);

    // const { password: _, ...safeAdmin } = newAdmin.dataValues;

    res.status(201).send({
      message: "New admin added",
      newAdmin,
      accessToken: tokens.accesstoken,
      refreshTokenAdmin: tokens.refreshtoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//---------------------------------------------------------------------

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Identification
    const admin = await Admins.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).send({ message: "Email yoki password noto'gri " });
    }

    //Autentificatsiya
    const valiPassword = bcrypt.compareSync(password, admin.password);
    if (!valiPassword) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }

    const payload = {
      id: admin.id,
      phone_number: admin.phone_number,
      is_creater: admin.is_creater,
      role: "admin",
    };

    const tokens = JwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshtoken;
    await admin.save();
    res.cookie("refreshTokenAdmin", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.status(200).send({
      message: "Admin login successful",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshTokenAdmin } = req.cookies;
    if (!refreshTokenAdmin) {
      return res.status(400).send({ message: "Refresh token not found" });
    }

    const admin = await Admins.findOne({
      where: { refresh_token: refreshTokenAdmin },
    });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    await admin.update({ refresh_token: null });

    res.clearCookie("refreshTokenAdmin");
    res.status(200).send({ message: "Logout successful token uchirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const refreshTokenAdmin = async (req, res) => {
  try {
    const { refreshTokenAdmin } = req.cookies;

    if (!refreshTokenAdmin) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    // const decodedRefreshToken = await jwtService.verifyRefreshToken(
    //   refreshTokenAdmin
    // );
    const admin = await Admins.findOne({ refresh_token: refreshTokenAdmin });
    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: admin.id,
      phone_number: admin.phone_number,
      is_creater: admin.is_creater,
      role: "admin",
    };

    const tokens = JwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshtoken;
    await admin.save();
    res.cookie("refreshTokenAdmin", tokens.refreshtoken, {
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

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admins.findAll();
    res.status(200).send({ admins });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      email,
      password,
      phone_number,
      assigned_region_id,
      is_creater,
    } = req.body;

    const admin = await Admins.findByPk(id);
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    if (email && email !== admin.email) {
      const emailTaken = await Admins.findOne({ where: { email } });
      if (emailTaken) {
        return res.status(409).send({ message: "Email already exists" });
      }
    }

    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : admin.password;

    await admin.update({
      full_name,
      email,
      password: updatedPassword,
      phone_number,
      assigned_region_id,
      is_creater,
    });

    // const { password: _, ...safeAdmin } = admin.dataValues;

    res
      .status(200)
      .send({ message: "Admin updated successfully", admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findByPk(id);
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    await Admins.destroy({ where: { id } });

    res.status(200).send({ message: "Admin deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewAdmin,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
