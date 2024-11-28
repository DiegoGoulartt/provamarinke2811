const { Payment } = require('../models/index');

const createPayment = async (req, res) => {
  try {
    const { jobId, operationDate, paymentValue } = req.body;
    const payment = await Payment.create({ jobId, operationDate, paymentValue });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar pagamento', error });
  }
};

module.exports = { createPayment };