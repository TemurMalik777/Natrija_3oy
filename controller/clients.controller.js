const { errorHandler } = require("../helpers/error_handler");
const Regions = require("../models/region.models");
const Clients = require("../models/clients.models");
const { clientValidation } = require("../validations/clients.validation");
const bcrypt = require("bcrypt");
const config = require("config");
const jwtService = require("../services/jwt.service");
const mailService = require("../services/mail.service");
const uuid = require("uuid");

const addNewClient = async (req, res) => {
  try {
    const { error, value } = clientValidation(req.body);

    if (error) {
      errorHandler(error, res);
    }

    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      region_id,
      address,
      password_series,
      password_selfie,
    } = value;
    console.log(value);

    const existing = await Clients.findOne({ where: { email } });
    if (existing) {
      return res.status(409).send({ message: "Email alredy exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activation_link = uuid.v4();

    const newClient = await Clients.create({
      first_name,
      last_name,
      phone,
      email,
      password: hashedPassword,
      region_id,
      address,
      password_series,
      password_selfie,
      activation_link,
    });

    await mailService.sendActivationMail(
      newClient.email,
      `${config.get("api_url")}/api/client/activate/${activation_link}`
    );

    const payload = {
      id: newClient.id,
      email: newClient.email,
      phone: newClient.phone,
      role: "client",
    };
    const tokens = jwtService.generateTokens(payload);

    res.status(201).send({
      message: "New client added",
      newClient,
      accessToken: tokens.accesstoken,
      refreshTokenClients: tokens.refreshtoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateClients = async (req, res) => {
  try {
    const client = await Clients.findOne({
      where: { activation_link: req.params.link },
    });
    if (!client) {
      return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
    }

    const payload = {
      id: client.id,
      email: client.email,
      phone: client.phone,
      role: "client",
    };

    const tokens = jwtService.generateTokens(payload);

    // client.is_active = true;
    client.refresh_token = tokens.refreshtoken;
    await client.save();

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Foydalanuvchi faollashtirildi",
      // status: owner.is_active,
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

//---------------------------------------------------------------------

const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Clients.findOne({ where: { email } });

    if (!client) {
      return res.status(404).send({ message: "Email yoki password noto'gri " });
    }

    const valiPassword = bcrypt.compareSync(password, client.password);
    if (!valiPassword) {
      return res.status(400).send({ message: "Email yoki password noto'gri " });
    }

    const payload = {
      id: client.id,
      email: client.email,
      phone: client.phone,
      role: "client",
    };

    const tokens = jwtService.generateTokens(payload);
    client.refresh_token = tokens.refreshtoken;
    await client.save();
    res.cookie("refreshTokenClient", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.status(200).send({
      message: "Client login successful",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutClient = async (req, res) => {
  try {
    const { refreshTokenClient } = req.cookies;
    if (!refreshTokenClient) {
      return res.status(400).send({ message: "Refresh token not found" });
    }

    const client = await Clients.findOne({
      where: { refresh_token: refreshTokenClient },
    });
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    await client.update({ refresh_token: null });

    res.clearCookie("refreshTokenClient");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

const refreshTokenClient = async (req, res) => {
  try {
    const { refreshTokenClient } = req.cookies;

    if (!refreshTokenClient) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi ?" });
    }
    const decodedRefreshToken = await jwtService.verifyRefreshToken(
      refreshTokenClient
    );
    const client = await Clients.findOne({ refresh_token: refreshTokenClient });
    if (!client) {
      return res
        .status(400)
        .send({ message: "Bunday tokendagi foydalanuvchi topilmadi" });
    }
    const payload = {
      id: client.id,
      email: client.email,
      phone: client.phone,
      role: "client",
    };

    const tokens = jwtService.generateTokens(payload);
    client.refresh_token = tokens.refreshtoken;
    await client.save();
    res.cookie("refreshTokenClient", tokens.refreshtoken, {
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

const getAllClients = async (req, res) => {
  try {
    const clients = await Clients.findAll({
      include: {
        model: Regions,
        attributes: ["id", "name"],
        required: false,
      },
    });
    res.status(200).send({ clients });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    res.status(200).send({ client });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = clientValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      region_id,
      address,
      password_series,
      password_selfie,
      refresh_token,
    } = value;


    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    const [updateCount, updateClent] = await Clients.update({
      first_name,
      last_name,
      phone,
      email,
      password,
      region_id,
      address,
      password_series,
      password_selfie,
      refresh_token,
    },
    { where: { id }, returning: true }
  );

  if (updateCount === 0) {
    return res.status(400).send({ message: "Client update failed" });
  }

    res.status(200).send({
      updateClent: updateClent[1],
      message: "Client updated successfully",
      client,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    await Clients.destroy({ where: { id } });

    res.status(200).send({
      message: "Client deleted successfully",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewClient,
  activateClients,
  loginClient,
  logoutClient,
  refreshTokenClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
};
