import express from 'express';

import AuthController from '../controllers/auth';
import UserController from '../controllers/user';
import CitizenController from '../controllers/citizen';
import CollectPointController from '../controllers/collectPoint';
import AdController from '../controllers/ad';
import ScheduleCollect from '../controllers/scheduleCollect';
import PendingCollect from '../controllers/pendingCollect';
import CalendarController from '../controllers/calendar';
import Admin from '../controllers/admin';

const router = express.Router();

router.use('/auth', AuthController);
router.use('/user', UserController);
router.use('/citizen', CitizenController);
router.use('/collectpoint', CollectPointController);
router.use('/ad', AdController);
router.use('/scheduleCollect', ScheduleCollect);
router.use('/pending-collect', PendingCollect);
router.use('/calendar', CalendarController);
router.use('/admin', Admin);

export default router;
