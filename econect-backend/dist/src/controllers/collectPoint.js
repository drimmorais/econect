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
const CollectPoint = __importStar(require("../models/CollectPoint"));
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const levels_1 = require("../middlewares/levels");
const router = express_1.default.Router();
router.post('/create', async (req, res) => {
    const isCnpjValid = cpf_cnpj_validator_1.cnpj.isValid(req.body.cnpj);
    if (!isCnpjValid)
        res.status(400).json({ error: 'Number of CNPJ is not valid' });
    else {
        const newCollectPoint = await CollectPoint.createCollectpont(req.body);
        if (!newCollectPoint) {
            return res.status(400).json({ error: 'Error at create collect point' });
        }
        res.json(newCollectPoint);
    }
});
router.post('/insertToValide/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const InsertToValidate = await CollectPoint.insertToValide(req.params.id, req.body);
    if (!InsertToValidate) {
        return res.status(400).json({ error: 'Error at insert table' });
    }
    res.json(InsertToValidate);
});
router.post('/insertToChangeStatus/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const InsertToChangeStatus = await CollectPoint.insertToChangeStatus(req.params.id, req.body);
    if (!InsertToChangeStatus) {
        return res.status(400).json({ error: 'Error at insert table' });
    }
    res.json(InsertToChangeStatus);
});
router.put('/update/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const updateUser = await CollectPoint.updateCollectpoint(req.params.id, req.body);
    if (!updateUser) {
        return res.status(400).json({ error: 'Error at update create colect' });
    }
    res.json(updateUser.rows);
});
router.put('/updatePassword/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    if (req.body.new_password === req.body.confirm_password) {
        const updatePassword = await CollectPoint.updatePasswordCollectPoint(req.params.id, req.body);
        if (!updatePassword) {
            return res.status(400).json({
                error: 'Error at update password collect point, check your current password ',
            });
        }
        return res.status(200).json({ sucess: 'Password Updated Successfully ' });
    }
});
router.get('/perfil/:id', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const perfilUser = await CollectPoint.getPerfil(req.params.id);
    if (!perfilUser) {
        return res.status(400).json({ error: 'Error at get view collect point' });
    }
    res.json(perfilUser.rows[0]);
});
router.get('/all', auth_1.default, levels_1.isCollectPoint, async (req, res) => {
    const points = await CollectPoint.getCollectPoint();
    if (!points) {
        return res.status(400).json({ error: 'Error at get collect points' });
    }
    res.json(points.rows);
});
exports.default = router;
