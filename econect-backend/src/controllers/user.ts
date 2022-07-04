import express from 'express';
import * as UserModel from '../models/User';
import auth from '../middlewares/auth';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
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

router.post('/create', async (req, res) => {
  if (req.body.confirm_password === req.body.password) {
    const newUser = await UserModel.createGenericUser(req.body);
    if (!newUser)
      return res.status(400).json({ error: 'Failed at create new user' });
    const [{ id, typeuser }] = newUser;
    res.json({ id, typeuser });
  }
  res.status(400).json({ error: 'Passwor and confirm_password is not equality' });
});

router.put('/update/:id', auth, async (req, res) => {
  const updateUser = await UserModel.updateUser(req.params.id, req.body);
  if (!updateUser) {
    return res.status(400).json({ error: 'Failed at update' });
  }
  res.status(200).json({ sucess: 'Update sucess' });
});

export default router;
