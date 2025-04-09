const { errorHandler } = require("../helpers/error_handler");
const Products = require("../models/products.models");
const { productValidation } = require("../validations/product.validation");


const addNewProduct = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    if (error) {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.details });
    }

    const {
      owner_id,
      category_id,
      title,
      description,
      manufacture_year,
      price_per_day,
      is_available,
      location,
      image_url,
    } = value;

    const newProduct = await Products.create({
      owner_id,
      category_id,
      title,
      description,
      manufacture_year,
      price_per_day,
      is_available,
      location,
      image_url,
    });

    res.status(201).send({ message: "Product created", data: newProduct });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).send({ products });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ product });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = productValidation(req.body);
    if(error){
      return errorHandler(error, res)
    }
    const {
      owner_id,
      category_id,
      title,
      description,
      manufacture_year,
      price_per_day,
      is_available,
      location,
      image_url,
    } = value;

    // const { error } = productValidation(req);
    // if (error) {
    //   return res
    //     .status(400)
    //     .send({ message: "Validation error", error: error.array() });
    // }

    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const updatedRowsCount = await product.update({ 
      owner_id,
      category_id,
      title,
      description,
      manufacture_year,
      price_per_day,
      is_available,
      location,
      image_url, 
    });

    if (updatedRowsCount === 0){
      return res.status(400).send({ message: "Product update file"})
    }

    res.status(200).send({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    await Products.destroy({ where: { id } });

    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProduct,
};
