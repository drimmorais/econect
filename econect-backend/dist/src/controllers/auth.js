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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const UserModel = __importStar(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const mailer_1 = __importDefault(require("../../modules/mailer"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/login', async (req, res, next) => {
    try {
        const [user] = await UserModel.findUser(req.body.email);
        if (!user) {
            return res.status(401).json({
                erros: ['Usuario não exite'],
            });
        }
        if ((await UserModel.passwordIsValid(req.body.email, req.body.password)) == false) {
            return res.status(401).json({
                erros: ['Senha Invalida'],
            });
        }
        const { id, username } = user;
        const token = jsonwebtoken_1.default.sign({
            id,
            username,
        }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });
        return res.json({
            auth: true,
            token: token,
            id: id,
            type: user.typeuser,
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/logout', (req, res) => {
    res.json({ auth: false, token: null });
});
router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
    try {
        const [user] = await UserModel.findUser(email);
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }
        user.tokenForgetPassword = crypto_1.default.randomBytes(15).toString('hex');
        await UserModel.updateResetPassworToken(user.id, user.tokenForgetPassword);
        mailer_1.default.sendMail({
            to: email,
            subject: 'Alteração de senha',
            html: ` <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
<div class="container" style="">
    <table>
        <div style="background-color: #acbf60; text-align: center; font-family: 'Montserrat', sans-serif;">
            <a><img src="https://i.ibb.co/4TXMFdS/logo-Recuperado.png" alt="logo-Recuperado" border="0"
                    style="width: 4%; padding-top: 5px;"></a>
            <h2 style="padding-bottom: 10px; color: #FAFAFA">Alteração de senha</h2>
        </div>
        <div style="font-family: 'Montserrat', sans-serif; margin-left: 50px;">
            <p>Fala ae, aqui é da equipe eConect.</p>
            <p>Você esqueceu a sua senha? Não tem problema, clica no link abaixo para redefinir sua senha </p>
            <a href="http://localhost:4200/reset/password">http://localhost:4200/reset/password<a>
            <p><b>Observação:</b> este email foi gerado automaticamente, por favor não responda essa mensagem.</p>
            <b>
                <p style="font-size: 15px;">Abraçooos,</p>
            </b>
            <b>
                <p style="font-size: 15px;">Equipe eConect</p>
            </b>
        </div>
    </table>
</div>`,
        }, (err) => {
            if (err)
                res.status(400).json({ error: 'Cannot send forgot the password email' });
        });
        res.status(200).json({
            sucess: `Email successfully sent`,
            token: `${user.tokenForgetPassword}`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Erro on forgot password, try again' });
    }
});
router.post('/reset_password/:token', async (req, res) => {
    if (req.body.password === req.body.confirm_password) {
        const { email, password } = req.body;
        const token = req.params.token;
        token.replace(/['"]+/g, '');
        try {
            const [user] = await UserModel.findUser(email);
            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }
            if (token !== user.passwordresettoken) {
                return res.status(400).send({ error: 'Token Invalid' });
            }
            await UserModel.resetPasword(user.id, password);
            res.status(200).json({ sucess: 'Password Changed Successfully ' });
        }
        catch (error) {
            res.status(400).send({ error: 'Canot reset password, try again' });
        }
    }
    return res
        .status(400)
        .json({ error: 'New Password and Confirm password is not equality' });
});
exports.default = router;
