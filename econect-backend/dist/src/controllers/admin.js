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
const AdminModel = __importStar(require("../models/Admin"));
const CollectPoint = __importStar(require("../models/CollectPoint"));
const levels_1 = require("../middlewares/levels");
const auth_1 = __importDefault(require("../middlewares/auth"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/EcoblogPost/');
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
const router = express_1.default.Router();
router.get('/allPending', auth_1.default, levels_1.isAdm, async (req, res) => {
    const allCollectPoints = await AdminModel.getAllPendingCollectPoint();
    if (!allCollectPoints) {
        return res.status(400).json({ error: 'Failed at GET infos' });
    }
    res.status(200).json(allCollectPoints);
});
router.get('/infosOfPending/:cnpj', auth_1.default, levels_1.isAdm, async (req, res) => {
    const infosCollectPoints = await AdminModel.getInfosPendingCollectPointByCnpj(req.params.cnpj);
    if (!infosCollectPoints) {
        return res.status(400).json({ error: 'Failed at GET infos' });
    }
    res.status(200).json(infosCollectPoints);
});
router.put('/approveCollectPoint/:cnpj', async (req, res) => {
    const approveCollectPoints = await AdminModel.approvePendingCollectPoint(req.params.cnpj);
    if (!approveCollectPoints) {
        return res.status(400).json({ error: 'Failed at validate Collect Point' });
    }
    res.status(200).json('A aprovação foi feita com sucesso');
});
router.put('/disapproveCollectPoint/:cnpj', async (req, res) => {
    const approveCollectPoints = await AdminModel.disapprovePendingCollectPoint(req.params.cnpj);
    if (!approveCollectPoints) {
        return res.status(400).json({ error: 'Failed at validate Collect Point' });
    }
    res.status(200).json('A aprovação foi feita com sucesso');
});
router.post('/createPostToEcoblog', auth_1.default, levels_1.isAdm, async (req, res) => {
    try {
        const newPost = await AdminModel.createNewPost(req.body);
        if (!newPost)
            return res.status(400).json({ error: 'Failed at create new post' });
        res.json('Post criado com sucesso');
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed at create new post' });
    }
});
router.get('/getAllEcoblog', auth_1.default, async (req, res) => {
    try {
        const getPost = await AdminModel.getAllPosts();
        if (!getPost)
            return res.status(400).json({ error: 'Failed at get Post' });
        res.json(getPost.rows);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed at get post' });
    }
});
router.get('/updatesPending', auth_1.default, levels_1.isAdm, async (req, res) => {
    const allCollectPoints = await AdminModel.getAllUpdatePending();
    if (!allCollectPoints) {
        return res.status(400).json({ error: 'Failed at GET infos' });
    }
    res.status(200).json(allCollectPoints);
});
router.get('/infosOfUpdatesPending/:cnpj', auth_1.default, levels_1.isAdm, async (req, res) => {
    const infosCollectPoints = await AdminModel.getInfosUpdatesPendingByCnpj(req.params.cnpj);
    if (!infosCollectPoints) {
        return res.status(400).json({ error: 'Failed at GET infos' });
    }
    res.status(200).json(infosCollectPoints);
});
router.put('/approveUpdates/:cnpj', async (req, res) => {
    const [CollectPoints] = await AdminModel.getInfosUpdatesPendingByCnpj(req.params.cnpj);
    const CollectValidade = await AdminModel.approveUpdatesPending(req.params.cnpj);
    if (!CollectValidade) {
        return res
            .status(400)
            .json({ error: 'Failed at validate Updates Validation Collect Point' });
    }
    const approveUpdates = await CollectPoint.updateCollectpoint(CollectPoints.user_id, CollectPoints);
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
router.get('/infosOfChangeStatus/:cnpj', auth_1.default, levels_1.isAdm, async (req, res) => {
    const infosCollectPoints = await AdminModel.getInfosChangeOfStatusByCnpj(req.params.cnpj);
    if (!infosCollectPoints) {
        return res.status(400).json({ error: 'Failed at GET infos' });
    }
    res.status(200).json(infosCollectPoints);
});
router.put('/approveStatusChanges/:cnpj', async (req, res) => {
    const [CollectPoints] = await AdminModel.getInfosChangeOfStatusByCnpj(req.params.cnpj);
    const StatusValidade = await AdminModel.approveStatusChangePending(req.params.cnpj);
    if (!StatusValidade) {
        return res
            .status(400)
            .json({ error: 'Failed at validate Updates Validation Status Collect Point' });
    }
    const approveUpdates = await CollectPoint.updateStatusCollectpoint(CollectPoints.user_id, CollectPoints.new_status);
    if (!approveUpdates) {
        return res
            .status(400)
            .json({ error: 'Failed at validate Updates Collect Point' });
    }
    res.status(200).json('A aprovação foi feita com sucesso');
});
exports.default = router;
