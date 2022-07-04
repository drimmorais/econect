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
const PendingCollect = __importStar(require("../models/PendingCollect"));
const router = express_1.default.Router();
router.put('/in-progress/:id', auth_1.default, async (req, res) => {
    const progressPendingCollect = await PendingCollect.progressPendingCollect(req.params.id, req.body);
    console.log(progressPendingCollect);
    if (!progressPendingCollect) {
        res.status(400).send([]);
    }
    res.status(200).json({
        msg: `Operação ${req.body.operation_id} alterada para EM ANDAMENTO!`,
        status: 'ANDAMENTO',
    });
});
//USUARIO DESISTE DA OPERAÇÃO
router.put('/cancel/:id', auth_1.default, levels_1.isCitizen, async (req, res) => {
    const confirmPendingCollect = await PendingCollect.cancelPendingCollect(req.params.id, req.body);
    if (!confirmPendingCollect) {
        res.status(400).send([]);
    }
    res.status(200).json({
        msg: `Operação ${req.body.operation_id} alterada para CANCELADA!`,
        status: 'CANCELADA',
    });
});
//PASSAR ID DO CIDADAO COMO PARAMETRO NESTE ENDPOINT
router.put('/user-confirm/:id', auth_1.default, levels_1.isCitizen, async (req, res) => {
    const unrealizedPendingCollect = await PendingCollect.userConfirmPendingCollect(req.params.id, req.body);
    if (!unrealizedPendingCollect) {
        res.status(400).send([]);
    }
    res.status(200).json({
        msg: `A entrega referente a operação ${req.body.operation_id} foi feita pela cidadão!`,
        status: 'ENTREGUE',
    });
});
router.put('/unrealized/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const unrealizedPendingCollect = await PendingCollect.unrealizedPendingCollect(req.params.id, req.body);
    if (!unrealizedPendingCollect) {
        res.status(400).send([]);
    }
    res.status(200).json({
        msg: `Operação ${req.body.operation_id} alterada para NÃO REALIZADA!`,
        status: 'NÃO REALIZADA',
    });
});
router.put('/confirm/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const confirmPendingCollect = await PendingCollect.confirmPendingCollect(req.params.id, req.body);
    if (!confirmPendingCollect) {
        res.status(400).send([]);
    }
    res.status(200).json({
        msg: `Operação ${req.body.operation_id} alterada para CONCLUIDA!`,
        status: 'CONCLUIDO',
    });
});
exports.default = router;
