const express = require('express');
const router = express.Router();
const { Profile } = require('../models');

router.post('/:profileId/deposit', async (req, res) => {
  const { profileId } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Valor de depósito inválido' });
  }

  try {
    const profile = await Profile.findByPk(profileId);
    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    profile.balance += amount;
    await profile.save();

    res.status(200).json({
      message: 'Depósito realizado com sucesso',
      balance: profile.balance,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar depósito' });
  }
});

module.exports = router;
