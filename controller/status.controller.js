const { errorHandler } = require("../helpers/error_handler");
const Status = require("../models/status.models");
const statusValidation = require("../validations/status.validation");

const addNewStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const { error } = statusValidation(req);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const newStatus = await Status.create({ name });

    res.status(201).send({
      message: "New status added",
      newStatus,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const { error } = statusValidation(req);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }

    await status.update({ name });

    res.status(200).send({
      message: "Status updated successfully",
      status,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }

    await Status.destroy({ where: { id } });

    res.status(200).send({
      message: "Status deleted successfully",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewStatus,
  getAllStatus,
  getStatusById,
  updateStatus,
  deleteStatus,
};
