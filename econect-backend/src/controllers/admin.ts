import express from 'express';
import * as AdminModel from '../models/Admin';
import * as CollectPoint from '../models/CollectPoint';
import { isAdm } from '../middlewares/levels';
import auth from '../middlewares/auth';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/EcoblogPost/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/jpg') {
    cb(null, true);
  } else cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1021 * 5 },
  fileFilter: fileFilter,
});

const router = express.Router();

router.get('/allPending', auth, isAdm, async (req, res) => {
  const allCollectPoints = await AdminModel.getAllPendingCollectPoint();
  if (!allCollectPoints) {
    return res.status(400).json({ error: 'Failed at GET infos' });
  }
  res.status(200).json(allCollectPoints);
});

router.get('/infosOfPending/:cnpj', auth, isAdm, async (req, res) => {
  const infosCollectPoints = await AdminModel.getInfosPendingCollectPointByCnpj(
    req.params.cnpj,
  );
  if (!infosCollectPoints) {
    return res.status(400).json({ error: 'Failed at GET infos' });
  }
  res.status(200).json(infosCollectPoints);
});

router.put('/approveCollectPoint/:cnpj', async (req, res) => {
  const approveCollectPoints = await AdminModel.approvePendingCollectPoint(
    req.params.cnpj,
  );
  if (!approveCollectPoints) {
    return res.status(400).json({ error: 'Failed at validate Collect Point' });
  }
  res.status(200).json('A aprovação foi feita com sucesso');
});

router.put('/disapproveCollectPoint/:cnpj', async (req, res) => {
  const approveCollectPoints = await AdminModel.disapprovePendingCollectPoint(
    req.params.cnpj,
  );
  if (!approveCollectPoints) {
    return res.status(400).json({ error: 'Failed at validate Collect Point' });
  }
  res.status(200).json('A aprovação foi feita com sucesso');
});

router.post('/createPostToEcoblog', auth, isAdm, async (req, res) => {
  try {
    const newPost = await AdminModel.createNewPost(req.body);
    if (!newPost)
      return res.status(400).json({ error: 'Failed at create new post' });
    res.json('Post criado com sucesso');
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed at create new post' });
  }
});

router.get('/getAllEcoblog', auth, async (req, res) => {
  try {
    const getPost = await AdminModel.getAllPosts();

    if (!getPost) return res.status(400).json({ error: 'Failed at get Post' });
    res.json(getPost.rows);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed at get post' });
  }
});

router.get('/updatesPending', auth, isAdm, async (req, res) => {
  const allCollectPoints = await AdminModel.getAllUpdatePending();
  if (!allCollectPoints) {
    return res.status(400).json({ error: 'Failed at GET infos' });
  }
  res.status(200).json(allCollectPoints);
});

router.get('/infosOfUpdatesPending/:cnpj', auth, isAdm, async (req, res) => {
  const infosCollectPoints = await AdminModel.getInfosUpdatesPendingByCnpj(
    req.params.cnpj,
  );
  if (!infosCollectPoints) {
    return res.status(400).json({ error: 'Failed at GET infos' });
  }
  res.status(200).json(infosCollectPoints);
});

router.put('/approveUpdates/:cnpj', async (req, res) => {
  const [CollectPoints] = await AdminModel.getInfosUpdatesPendingByCnpj(
    req.params.cnpj,
  );

  const CollectValidade = await AdminModel.approveUpdatesPending(req.params.cnpj);
  if (!CollectValidade) {
    return res
      .status(400)
      .json({ error: 'Failed at validate Updates Validation Collect Point' });
  }
  const approveUpdates = await CollectPoint.updateCollectpoint(
    CollectPoints.user_id,
    CollectPoints,
  );
  if (!approveUpdates) {
    return res
      .status(400)
      .json({ error: 'Failed at validate Updates Collect Point' });
  }
  res.status(200).json('A aprovação foi feita com sucesso');
});

router.put('/disapprovedUpdates/:cnpj', async (req, res) => {
  const cancelUpdates = await AdminModel.disapprovedUpdatesPending(req.params.cnpj);
  if (!cancelUpdates) {
    return res
      .status(400)
      .json({ error: 'Failed at disapprove Updates Collect Point' });
  }
  res.status(200).json('A Reprovação foi feita com sucesso');
});

router.get('/infosOfChangeStatus/:cnpj', auth, isAdm, async (req, res) => {
  const infosCollectPoints = await AdminModel.getInfosChangeOfStatusByCnpj(
    req.params.cnpj,
  );
  if (!infosCollectPoints) {
    return res.status(400).json({ error: 'Failed at GET infos' });
  }
  res.status(200).json(infosCollectPoints);
});

router.put('/approveStatusChanges/:cnpj', async (req, res) => {
  const [CollectPoints] = await AdminModel.getInfosChangeOfStatusByCnpj(
    req.params.cnpj,
  );

  const StatusValidade = await AdminModel.approveStatusChangePending(
    req.params.cnpj,
  );
  if (!StatusValidade) {
    return res
      .status(400)
      .json({ error: 'Failed at validate Updates Validation Status Collect Point' });
  }
  const approveUpdates = await CollectPoint.updateStatusCollectpoint(
    CollectPoints.user_id,
    CollectPoints.new_status,
  );
  if (!approveUpdates) {
    return res
      .status(400)
      .json({ error: 'Failed at validate Updates Collect Point' });
  }
  res.status(200).json('A aprovação foi feita com sucesso');
});

router.get('/report-schedule-type-material/:type_material/:date_start/:date_end', auth, isAdm, async (req, res) => {
  let dateStart = req.params.date_start.replace(/[-]/g, '/')
  let dateEnd = req.params.date_end.replace(/[-]/g, '/')

  const schedules = await AdminModel.getReportSchedulesTypeMaterial(req.params.type_material, dateStart, dateEnd);
  if (!schedules) {
    return res.status(400).json({ error: 'Error at get report schedules' });
  }
  res.json(schedules.rows);
});


router.get('/report-schedule-type-material/:type_material/:date_start/:date_end', auth, isAdm, async (req, res) => {
  let dateStart = req.params.date_start.replace(/[-]/g, '/')
  let dateEnd = req.params.date_end.replace(/[-]/g, '/')

  const schedules = await AdminModel.getReportSchedulesTypeMaterial(req.params.type_material, dateStart, dateEnd);
  if (!schedules) {
    return res.status(400).json({ error: 'Error at get report schedules' });
  }
  res.json(schedules.rows);
});

router.get('/report-schedule/:date_start/:date_end', auth, isAdm, async (req, res) => {
  let dateStart = req.params.date_start.replace(/[-]/g, '/')
  let dateEnd = req.params.date_end.replace(/[-]/g, '/')

  const schedules = await AdminModel.getReportSchedules(dateStart, dateEnd);
  if (!schedules) {
    return res.status(400).json({ error: 'Error at get report schedules' });
  }
  res.json(schedules.rows);
});


export default router;
