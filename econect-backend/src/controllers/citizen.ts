import express from 'express';
import * as CitizenModel from '../models/Citizen';
import auth from '../middlewares/auth';
import { cpf } from 'cpf-cnpj-validator';
import cep from 'cep-promise';
import { isCitizen } from '../middlewares/levels';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const isCpfValid = cpf.isValid(req.body.cpf);

    if (!isCpfValid) res.status(400).json({ error: 'Number of CPF is not valid' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao validar CPF' });
  }

  const newCitizen = await CitizenModel.createCitizen(req.body);
  if (newCitizen.name == 'error') {
    return res.status(400).json({ error: newCitizen.message });
  } else {
    res.status(200).json(newCitizen);
  }
});

router.put('/update/:id', auth, isCitizen, async (req, res) => {
  const updateUser = await CitizenModel.updateCitizen(req.params.id, req.body);

  if (updateUser == false) {
    return res.status(400).json({ error: 'Error at update citizen' });
  } else {
    res.status(200).json({ sucess: 'Sucess at update citizen' });
  }
});

router.get('/perfil/:id', auth, isCitizen, async (req, res) => {
  const perfilUser = await CitizenModel.getPerfil(req.params.id);
  if (perfilUser == false) {
    return res.status(400).json({ error: 'Error at get view citizen' });
  } else {
    res.status(200).json(perfilUser.rows[0]);
  }
});

router.put('/updatePassword/:id', auth, isCitizen, async (req, res) => {
  if (req.body.new_password === req.body.confirm_password) {
    const updatePassword = await CitizenModel.updatePasswordCitizen(
      req.params.id,
      req.body,
    );

    if (updatePassword == false) {
      return res.status(400).json({
        error: 'Error at update citizen, check your current password ',
      });
    } else {
      return res.status(200).json({ sucess: 'Password Updated Successfully ' });
    }
  }
  return res
    .status(400)
    .json({ error: 'New Password and Confirm password is not equality' });
});

export default router;
