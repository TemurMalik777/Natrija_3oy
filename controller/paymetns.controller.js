const { errorHandler } = require("../helpers/error_handler");
const Payments = require("../models/payments.models");
const paymentValidation = require("../validations/paymnets.validation");

const addNewPayment = async (req, res) => {
  try {
    const { contractId, amount, payment_date, method,clientId } = req.body;

    const { error } = paymentValidation(req);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const newPayment = await Payments.create({
      contractId,
      amount,
      payment_date,
      method,
      clientId
    });

    res.status(201).send({
      message: "New payment added",
      newPayment,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll();
    res.status(200).send({ payments });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const { contract_id, amount, payment_date, method } = req.body;

    const { error } = paymentValidation(req);
    if (error) {
      return res.status(400).send({
        message: "Validation error",
        error: error.details,
      });
    }

    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    await payment.update({
      contract_id,
      amount,
      payment_date,
      method,
    });

    res.status(200).send({
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payments.findByPk(id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    await Payments.destroy({ where: { id } });

    res.status(200).send({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
