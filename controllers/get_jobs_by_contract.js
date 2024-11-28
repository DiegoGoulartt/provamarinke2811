const { Job } = require('../models/index');

const getJobByIdContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const jobs = await Job.findAll({ where: { contractId } });
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Nenhum trabalho encontrado para este contrato.' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter trabalhos pelo ID do contrato', error });
  }
};

module.exports = { getJobByIdContract };