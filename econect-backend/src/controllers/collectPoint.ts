import express from 'express';
import auth from '../middlewares/auth';
import * as CollectPoint from '../models/CollectPoint';
import { cnpj } from 'cpf-cnpj-validator';
import { isCollectPoint } from '../middlewares/levels';

const router = express.Router();

router.post('/create', async (req, res) => {
  const isCnpjValid = cnpj.isValid(req.body.cnpj);
  if (!isCnpjValid) res.status(400).json({ error: 'Number of CNPJ is not valid' });
  else {
    const newCollectPoint = await CollectPoint.createCollectpont(req.body);
    if (!newCollectPoint) {
      return res.status(400).json({ error: 'Error at create collect point' });
    }
    res.json(newCollectPoint);
  }
});

router.post('/insertToValide/:id', auth, isCollectPoint, async (req, res) => {
  const InsertToValidate = await CollectPoint.insertToValide(
    req.params.id,
    req.body,
  );
  if (!InsertToValidate) {
    return res.status(400).json({ error: 'Error at insert table' });
  }
  res.json(InsertToValidate);
});

router.post('/insertToChangeStatus/:id', auth, isCollectPoint, async (req, res) => {
  const InsertToChangeStatus = await CollectPoint.insertToChangeStatus(
    req.params.id,
    req.body,
  );
  if (!InsertToChangeStatus) {
    return res.status(400).json({ error: 'Error at insert table' });
  }
  res.json(InsertToChangeStatus);
});

router.put('/update/:id', auth, isCollectPoint, async (req, res) => {
  const updateUser = await CollectPoint.updateCollectpoint(req.params.id, req.body);
  if (!updateUser) {
    return res.status(400).json({ error: 'Error at update create colect' });
  }
  res.json(updateUser.rows);
});

router.put('/updatePassword/:id', auth, isCollectPoint, async (req, res) => {
  if (req.body.new_password === req.body.confirm_password) {
    const updatePassword = await CollectPoint.updatePasswordCollectPoint(
      req.params.id,
      req.body,
    );

    if (!updatePassword) {
      return res.status(400).json({
        error:
          'Error at update password collect point, check your current password ',
      });
    }
    return res.status(200).json({ sucess: 'Password Updated Successfully ' });
  }
});

router.get('/perfil/:id', auth, isCollectPoint, async (req, res) => {
  const perfilUser = await CollectPoint.getPerfil(req.params.id);
  if (!perfilUser) {
    return res.status(400).json({ error: 'Error at get view collect point' });
  }
  res.json(perfilUser.rows[0]);
});

router.get('/all', auth, isCollectPoint, async (req, res) => {
  const points = await CollectPoint.getCollectPoint();
  if (!points) {
    return res.status(400).json({ error: 'Error at get collect points' });
  }
  res.json(points.rows);
});


export default router;
