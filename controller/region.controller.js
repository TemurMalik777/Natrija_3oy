const { errorHandler } = require("../helpers/error_handler");
const Regions = require("../models/region.models");
const regionValidation = require("../validations/region.validation");
// const bcrypt = require("bcrypt");

const addNewRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const { error } = regionValidation(req);
    if (error) {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.details });
    }

    const newRegion = await Regions.create({ name });

    res.status(201).send({
      message: "New region added",
      newRegion,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await Regions.findAll();
    res.status(200).send({ regions });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Regions.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }
    res.status(200).send({ region });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const { error } = regionValidation(req);
    if (error) {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.array() });
    }

    const region = await Regions.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }

    await region.update({ name });

    res.status(200).send({
      message: "Region updated successfully",
      region,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Regions.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Region not found" });
    }

    await Regions.destroy({ where: { id } });

    res.status(200).send({
      message: "Region deleted successfully",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
};
