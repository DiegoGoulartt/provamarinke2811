const { Job } = require('../models/index');

const createJob = async (req, res) => {
  try {
    const { contractId, description, operationDate, paymentDate, price, paid } = req.body;
    const job = await Job.create({ contractId, description, operationDate, paymentDate, price, paid });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar trabalho', error });
  }
};

module.exports = { createJob };