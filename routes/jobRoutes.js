const express = require('express');
const { Job, Contract } = require('../models');
const router = express.Router();

router.get('/contracts/:contractId/jobs/unpaid', async (req, res) => {
    const { contractId } = req.params;

    if (!contractId) {
        return res.status(400).json({ error: 'O parâmetro contractId é obrigatório.' });
    }

    try {
        const contract = await Contract.findByPk(contractId);
        if (!contract) {
            return res.status(404).json({ message: 'Contrato não encontrado.' });
        }

        
        const jobs = await Job.findAll({
            where: {
                contractId: contractId,
                paid: false, 
            },
            include: [
                {
                    model: Contract, 
                    attributes: ['id', 'terms', 'status'],
                },
            ],
        });

        if (jobs.length === 0) {
            return res.status(404).json({ message: 'Nenhum job não pago encontrado para este contrato.' });
        }

        const formattedJobs = jobs.map(job => {
            return {
                id: job.id,
                contractId: job.contractId,
                description: job.description,
                operationDate: job.operationDate,
                paymentDate: job.paymentDate,
                price: job.price,
                paid: job.paid,
                contractDetails: {
                    terms: job.Contract.terms,
                    status: job.Contract.status,
                },
                createdAt: job.createdAt,
                updatedAt: job.updatedAt,
            };
        });

        res.json(formattedJobs);
    } catch (error) {
        console.error('Erro ao listar trabalhos não pagos:', error);
        res.status(500).json({ error: 'Erro interno ao listar trabalhos não pagos.' });
    }
});

module.exports = router;
