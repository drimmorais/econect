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
const levels_1 = require("../middlewares/levels");
const levels_2 = require("../middlewares/levels");
const CalendarController = __importStar(require("../models/Calendar"));
const router = express_1.default.Router();
router.get('/citizen-calendar/:id/:time', auth_1.default, levels_2.isCitizen, async (req, res) => {
    const newPendingCollect = await CalendarController.getCitizenCalendar(req.params.id, req.params.time.replace(/[-]/g, '/'));
    if (!newPendingCollect) {
        res.status(400).send('Erro ao realizar a requisição');
    }
    res.json(newPendingCollect.rows);
});
router.get('/collect-point-calendar/:id/:time', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const newPendingCollect = await CalendarController.getPointCalendar(req.params.id, req.params.time.replace(/[-]/g, '/'));
    if (!newPendingCollect) {
        res.status(400).send('Erro ao realizar a requisição');
    }
    res.json(newPendingCollect.rows);
});
exports.default = router;
