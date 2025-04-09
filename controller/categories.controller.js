const { errorHandler } = require("../helpers/error_handler");
const Categories = require("../models/categories.models");
const categoriesValidation = require("../validations/categories.validation");

const addNewCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const { error } = categoriesValidation(req);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const newCategory = await Categories.create({ name });

    res.status(201).send({
      message: "New category added",
      newCategory,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).send({ categories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const { error } = categoriesValidation(req);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const category = await Categories.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await category.update({ name });
    res.status(200).send({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await Categories.destroy({ where: { id } });
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
