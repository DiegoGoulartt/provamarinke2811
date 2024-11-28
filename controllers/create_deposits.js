const { Deposit } = require('../models/index');

const createDeposit = async (req, res) => {
  try {
    const { clientId, operationDate, depositValue } = req.body;
    const deposit = await Deposit.create({ clientId, operationDate, depositValue });
    res.status(201).json(deposit);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar depósito', error });
  }
};

module.exports = { createDeposit };