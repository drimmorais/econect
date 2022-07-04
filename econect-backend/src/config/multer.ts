import multer from 'multer';
import path from 'path';

export default {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const alloewdMinmes = ['image/jpeg', 'image/pjeg', 'image/png', 'image/gif'];
    if (alloewdMinmes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};
