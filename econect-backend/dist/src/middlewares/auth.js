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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel = __importStar(require("../models/User"));
exports.default = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });
    }
    const [, token] = authorization.replace(/['"]+/g, '').split(' ');
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            if (err.message === 'jwt expired') {
                return res.status(401).json({ auth: false, message: 'Token expirado.' });
            }
            return res.status(500).json({ auth: false, message: err.message });
        }
        const castDecoded = decoded;
        if (decoded && castDecoded.id) {
            const user = await UserModel.getUserById(castDecoded.id);
            if (!user) {
                return res.status(401).json({ auth: false, message: 'Usuário não existe.' });
            }
            res.level = user[0].typeuser;
            return next();
        }
        return res
            .status(500)
            .json({ auth: false, message: 'Falha em autenticar o token.' });
    });
};
