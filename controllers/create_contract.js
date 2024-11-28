const { Contract } = require('../models/index');

const createContract = async (req, res) => {
  try {
    const { terms, clientId, contractorId, operationDate, status } = req.body;
    const contract = await Contract.create({ terms, clientId, contractorId, operationDate, status });
    res.status(201).json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar contrato', error });
  }
};

module.exports = { createContract };