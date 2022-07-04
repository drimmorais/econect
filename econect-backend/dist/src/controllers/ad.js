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
const auth_1 = __importDefault(require("../middlewares/auth"));
const Ad = __importStar(require("../models/Ad"));
const scheduleCollect_1 = require("../controllers/scheduleCollect");
const levels_1 = require("../middlewares/levels");
const router = express_1.default.Router();
router.post('/create/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const newAd = await Ad.createAd(req.params.id, req.body);
    if (!newAd) {
        res.status(400).send([]);
    }
    res.json(newAd);
});
router.put('/update/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const updateAd = await Ad.updateAd(req.params.id, req.body);
    if (!updateAd) {
        res.status(400).send([]);
    }
    res.json(updateAd);
});
router.delete('/delete/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const deleteAd = await Ad.deleteAd(req.params.id);
    if (!deleteAd) {
        res.status(400).send([]);
    }
    res.json(deleteAd);
});
router.get('/all', auth_1.default, levels_1.isCitizenAndCollectPoint, async (req, res) => {
    const Ads = await Ad.getAd();
    if (!Ads) {
        return res.status(400).json({ error: 'Error at get view citizen' });
    }
    res.json(Ads.rows);
});
router.put('/send-ad-schedule/:id', auth_1.default, levels_1.isCitizen, async (req, res) => {
    const adValid = await Ad.validationAd(req.params.id, req.body);
    if (!adValid.validation) {
        res.status(400).json(adValid);
    }
    if (req.body.isrecyclable)
        req.body.weight = [req.body.weight[0].toFixed(3)];
    else
        req.body.weight = [];
    const createdSchedule = await scheduleCollect_1.createSchedule(req.params.id, req.body);
    if (!createdSchedule.created) {
        res.status(400).json(createdSchedule);
        await Ad.returnAdWeigth(req.body);
    }
    else {
        res.status(200).json(createdSchedule);
    }
});
exports.default = router;
