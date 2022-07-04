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
const CitizenModel = __importStar(require("../models/Citizen"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const levels_1 = require("../middlewares/levels");
const router = express_1.default.Router();
router.post('/create', async (req, res) => {
    const isCpfValid = cpf_cnpj_validator_1.cpf.isValid(req.body.cpf);
    if (!isCpfValid)
        res.status(400).json({ error: 'Number of CPF is not valid' });
    const newCitizen = await CitizenModel.createCitizen(req.body);
    if (newCitizen.name == 'error') {
        return res.status(400).json({ error: newCitizen.message });
    }
    else {
        res.status(200).json(newCitizen);
    }
});
router.put('/update/:id', auth_1.default, levels_1.isCitizen, async (req, res) => {
    const updateUser = await CitizenModel.updateCitizen(req.params.id, req.body);
    if (updateUser == false) {
        return res.status(400).json({ error: 'Error at update citizen' });
    }
    else {
        res.status(200).json({ sucess: 'Sucess at update citizen' });
    }
});
router.get('/perfil/:id', auth_1.default, levels_1.isCitizen, async (req, res) => {
    const perfilUser = await CitizenModel.getPerfil(req.params.id);
    if (perfilUser == false) {
        return res.status(400).json({ error: 'Error at get view citizen' });
    }
    else {
        res.status(200).json(perfilUser.rows[0]);
    }
});
router.put('/updatePassword/:id', auth_1.default, levels_1.isCitizen, async (req, res) => {
    if (req.body.new_password === req.body.confirm_password) {
        const updatePassword = await CitizenModel.updatePasswordCitizen(req.params.id, req.body);
        if (updatePassword == false) {
            return res.status(400).json({
                error: 'Error at update citizen, check your current password ',
            });
        }
        else {
            return res.status(200).json({ sucess: 'Password Updated Successfully ' });
        }
    }
    return res
        .status(400)
        .json({ error: 'New Password and Confirm password is not equality' });
});
exports.default = router;
