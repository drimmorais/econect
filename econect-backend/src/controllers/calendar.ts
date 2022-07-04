import express from 'express';
import auth from '../middlewares/auth';
import { isCollectPoint } from '../middlewares/levels';
import { isCitizen } from '../middlewares/levels';
import * as CalendarController from '../models/Calendar';

const router = express.Router();

router.get('/citizen-calendar/:id/:time', auth, isCitizen, async (req, res) => {
  const newPendingCollect = await CalendarController.getCitizenCalendar(
    req.params.id,
    req.params.time.replace(/[-]/g, '/'),
  );
  if (!newPendingCollect) {
    res.status(400).send('Erro ao realizar a requisição');
  }
  res.json(newPendingCollect.rows);
});

router.get(
  '/collect-point-calendar/:id/:time',
  auth,
  isCollectPoint,
  async (req, res) => {
    const newPendingCollect = await CalendarController.getPointCalendar(
      req.params.id,
      req.params.time.replace(/[-]/g, '/'),
    );
    if (!newPendingCollect) {
      res.status(400).send('Erro ao realizar a requisição');
    }
    res.json(newPendingCollect.rows);
  },
);

export default router;
