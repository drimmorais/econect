import express from 'express';
import auth from '../middlewares/auth';
import * as Ad from '../models/Ad';
import { createSchedule } from '../controllers/scheduleCollect';
import {
  isCitizen,
  isCitizenAndCollectPoint,
  isCollectPoint,
} from '../middlewares/levels';

const router = express.Router();

router.post('/create/:id', auth, isCollectPoint, async (req, res) => {
  const newAd = await Ad.createAd(req.params.id, req.body);
  if (!newAd) {
    res.status(400).send([]);
  }
  res.json(newAd);
});

router.put('/update/:id', auth, isCollectPoint, async (req, res) => {
  const updateAd = await Ad.updateAd(req.params.id, req.body);
  if (!updateAd) {
    res.status(400).send([]);
  }
  res.json(updateAd);
});

router.delete('/delete/:id', auth, isCollectPoint, async (req, res) => {
  const deleteAd = await Ad.deleteAd(req.params.id);
  if (!deleteAd) {
    res.status(400).send([]);
  }
  res.json(deleteAd);
});

router.get('/all', auth, isCitizenAndCollectPoint, async (req, res) => {
  const Ads = await Ad.getAd();
  if (!Ads) {
    return res.status(400).json({ error: 'Error at get view citizen' });
  }
  res.json(Ads.rows);
});

router.put('/send-ad-schedule/:id', auth, isCitizen, async (req, res) => {
  const adValid = await Ad.validationAd(req.params.id, req.body);

  if (!adValid.validation) {
    res.status(400).json(adValid);
  }

  if (req.body.isrecyclable) req.body.weight = [req.body.weight[0].toFixed(3)];
  else req.body.weight = [];

  const createdSchedule = await createSchedule(req.params.id, req.body);

  if (!createdSchedule.created) {
    res.status(400).json(createdSchedule);
    await Ad.returnAdWeigth(req.body);
  } else {
    res.status(200).json(createdSchedule);
  }
});

export default router;
