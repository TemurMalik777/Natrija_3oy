const { errorHandler } = require("../helpers/error_handler");
const Contracts = require("../models/contracts.models");
const contractValidation = require("../validations/contracts.validation");

const addNewContract = async (req, res) => {
  try {
    const { product_id, client_id, start_date, end_date, total_price, status } =
      req.body;

    const { error } = contractValidation(req);
    if (error) {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.details });
    }

    const newContract = await Contracts.create({
      product_id,
      client_id,
      start_date,
      end_date,
      total_price,
      status,
    });

    res.status(201).send({ message: "New contract added", newContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contracts.findAll();
    res.status(200).send({ contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.findByPk(id);
    if (!contract)
      return res.status(404).send({ message: "Contract not found" });
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, client_id, start_date, end_date, total_price, status } =
      req.body;

    const { error } = contractValidation(req);
    if (error) {
      return res
        .status(400)
        .send({ message: "Validation error", error: error.details });
    }

    const contract = await Contracts.findByPk(id);
    if (!contract)
      return res.status(404).send({ message: "Contract not found" });

    await contract.update({
      product_id,
      client_id,
      start_date,
      end_date,
      total_price,
      status,
    });

    res.status(200).send({ message: "Contract updated", contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contracts.findByPk(id);
    if (!contract)
      return res.status(404).send({ message: "Contract not found" });

    await contract.destroy();
    res.status(200).send({ message: "Contract deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

//======================================================
const getContractByClientId = async (req, res) => {
  try {
    const clientId = req.params.id;
    const contract = await Contract.findAll({where:{clientId}});
    res.status(200).send({ contract });
  } catch (error) { 
    errorHandler(error, res);
  }
};

const getContractByClientIdAndContractId = async (req, res) => {
  try {
    const clientId = req.params.id;
    const contractId = req.params.contractId
    console.log(contractId);
    const contract = await Contract.findOne({where:{clientId, id:contractId}});
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractByOwnerIdAndContractId = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const contractId = req.params.contractId
    const contract = await Contract.findOne({where:{ownerId, id:contractId}});
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};


//======================================================

module.exports = {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
  getContractByClientId,
  getContractByClientIdAndContractId,
  getContractByOwnerIdAndContractId
};
