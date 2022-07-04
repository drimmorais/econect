"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.default = {
    dest: path_1.default.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer_1.default.diskStorage({
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
    fileFilter: (req, file, cb) => {
        const alloewdMinmes = ['image/jpeg', 'image/pjeg', 'image/png', 'image/gif'];
        if (alloewdMinmes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
};
