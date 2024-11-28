const express = require('express');
const { Contract, Profile } = require('../models');
const { Op } = require('sequelize'); 
const router = express.Router();


router.get('/:profileId/contracts', async (req, res) => {
  const { profileId } = req.params;

  if (!profileId) {
    return res.status(400).json({ error: 'profileId é obrigatório' });
  }

  try {
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [
          { clientId: profileId },
          { contractorId: profileId }
        ]
      },
      include: [
        { model: Profile, as: 'client', attributes: ['firstName', 'lastName'] },
        { model: Profile, as: 'contractor', attributes: ['firstName', 'lastName'] },
      ],
    });

    if (contracts.length === 0) {
      return res.status(404).json({ message: 'Nenhum contrato encontrado' });
    }

    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
