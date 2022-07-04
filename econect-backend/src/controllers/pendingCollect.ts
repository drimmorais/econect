import express from 'express';
import auth from '../middlewares/auth';
import { isCitizen, isCollectPoint } from '../middlewares/levels';
import * as PendingCollect from '../models/PendingCollect';

const router = express.Router();

router.put('/in-progress/:id', auth, async (req, res) => {
  const progressPendingCollect = await PendingCollect.progressPendingCollect(
    req.params.id,
    req.body,
  );
  console.log(progressPendingCollect);
  if (!progressPendingCollect) {
    res.status(400).send([]);
  }
  res.status(200).json({
    msg: `Operação ${req.body.operation_id} alterada para EM ANDAMENTO!`,
    status: 'ANDAMENTO',
  });
});

//USUARIO DESISTE DA OPERAÇÃO

router.put('/cancel/:id', auth, isCitizen, async (req, res) => {
  const confirmPendingCollect = await PendingCollect.cancelPendingCollect(
    req.params.id,
    req.body,
  );
  if (!confirmPendingCollect) {
    res.status(400).send([]);
  }
  res.status(200).json({
    msg: `Operação ${req.body.operation_id} alterada para CANCELADA!`,
    status: 'CANCELADA',
  });
});

//PASSAR ID DO CIDADAO COMO PARAMETRO NESTE ENDPOINT
router.put('/user-confirm/:id', auth, isCitizen, async (req, res) => {
  const unrealizedPendingCollect = await PendingCollect.userConfirmPendingCollect(
    req.params.id,
    req.body,
  );
  if (!unrealizedPendingCollect) {
    res.status(400).send([]);
  }
  res.status(200).json({
    msg: `A entrega referente a operação ${req.body.operation_id} foi feita pela cidadão!`,
    status: 'ENTREGUE',
  });
});

router.put('/unrealized/:id', auth, isCollectPoint, async (req, res) => {
  const unrealizedPendingCollect = await PendingCollect.unrealizedPendingCollect(
    req.params.id,
    req.body,
  );
  if (!unrealizedPendingCollect) {
    res.status(400).send([]);
  }
  res.status(200).json({
    msg: `Operação ${req.body.operation_id} alterada para NÃO REALIZADA!`,
    status: 'NÃO REALIZADA',
  });
});

router.put('/confirm/:id', auth, isCollectPoint, async (req, res) => {
  const confirmPendingCollect = await PendingCollect.confirmPendingCollect(
    req.params.id,
    req.body,
  );
  if (!confirmPendingCollect) {
    res.status(400).send([]);
  }
  res.status(200).json({
    msg: `Operação ${req.body.operation_id} alterada para CONCLUIDA!`,
    status: 'CONCLUIDO',
  });
});

export default router;
