"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserModel = __importStar(require("../models/User"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/jpg') {
        cb(null, true);
    }
    else
        cb(null, false);
};
const upload = multer_1.default({
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
router.put('/update/:id', auth_1.default, async (req, res) => {
    const updateUser = await UserModel.updateUser(req.params.id, req.body);
    if (!updateUser) {
        return res.status(400).json({ error: 'Failed at update' });
    }
    res.status(200).json({ sucess: 'Update sucess' });
});
exports.default = router;
