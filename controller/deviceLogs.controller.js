const { errorHandler } = require("../helpers/error_handler");
const DeviceLogs = require("../models/deviceLogs.models");
const deviceLogValidation = require("../validations/deviceLogs.validation");

const addNewDeviceLog = async (req, res) => {
  try {
    const { product_id, log_date, description } = req.body;

    const { error } = deviceLogValidation(req);
    if (error) {
      return res.status(400).send({ message: "Validation error", error: error.details });
    }

    const newLog = await DeviceLogs.create({
      product_id,
      log_date,
      description,
    });

    res.status(201).send({ message: "New log added", newLog });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllDeviceLogs = async (req, res) => {
  try {
    const logs = await DeviceLogs.findAll();
    res.status(200).send({ logs });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getDeviceLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await DeviceLogs.findByPk(id);
    if (!log) return res.status(404).send({ message: "Log not found" });
    res.status(200).send({ log });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateDeviceLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, log_date, description } = req.body;

    const { error } = deviceLogValidation(req);
    if (error) {
      return res.status(400).send({ message: "Validation error", error: error.details });
    }

    const log = await DeviceLogs.findByPk(id);
    if (!log) return res.status(404).send({ message: "Log not found" });

    await log.update({
      product_id,
      log_date,
      description,
    });

    res.status(200).send({ message: "Log updated", log });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteDeviceLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await DeviceLogs.findByPk(id);
    if (!log) return res.status(404).send({ message: "Log not found" });

    await log.destroy();
    res.status(200).send({ message: "Log deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewDeviceLog,
  getAllDeviceLogs,
  getDeviceLogById,
  updateDeviceLogById,
  deleteDeviceLogById,
};
