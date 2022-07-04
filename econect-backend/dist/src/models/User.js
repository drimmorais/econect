"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordIsValid = exports.resetPasword = exports.updateResetPassworToken = exports.updateUser = exports.getUserById = exports.findUser = exports.createGenericUser = void 0;
const psql_1 = __importDefault(require("../../psql"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createGenericUser = async (newUser) => {
    try {
        newUser.password = await bcryptjs_1.default.hash(newUser.password, 12);
        const queryInsert = `INSERT INTO users(email, username, name, password, typeuser, image, creationDate)
      VALUES('${newUser.email}', '${newUser.username}', '${newUser.name}', '${newUser.password}' , '${newUser.typeuser}', '${newUser.image}', NOW(  )) RETURNING id, typeuser;`;
        const { rows } = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para inserção de dados', err);
        return false;
    }
};
exports.createGenericUser = createGenericUser;
const findUser = async (email) => {
    try {
        const queryfindUserForLogin = `SELECT * FROM users WHERE email = '${email}'`;
        const { rows } = await psql_1.default.query(queryfindUserForLogin);
        return rows;
    }
    catch (error) {
        console.log('Não foi possivel obter nenhum usuario com o email informado');
        return;
    }
};
exports.findUser = findUser;
const getUserById = async (id) => {
    try {
        const queryfindUserForLogin = `SELECT * FROM users WHERE id = ${id}`;
        const { rows } = await psql_1.default.query(queryfindUserForLogin);
        return rows;
    }
    catch (error) {
        console.log('Não foi possivel obter nenhum usuario com o id informado');
        return;
    }
};
exports.getUserById = getUserById;
const updateUser = async (userId, updatedValues) => {
    try {
        const users = await psql_1.default.query(`SELECT * FROM users WHERE id = '${userId}'`);
        if (users.rows.length == 0)
            return false;
        const queryUpdate = `UPDATE users SET email = '${updatedValues.email}', username = '${updatedValues.username}', name = '${updatedValues.name}', image = '${updatedValues.image}' WHERE id = '${userId}';`;
        await psql_1.default.query(queryUpdate);
        return true;
    }
    catch (error) {
        console.log('Não foi possivel atualizar os dados');
        return false;
    }
};
exports.updateUser = updateUser;
const updateResetPassworToken = async (userId, updatedResetPassworToken) => {
    try {
        await psql_1.default.query(`UPDATE users SET passwordResetToken = '${updatedResetPassworToken}' WHERE id = '${userId}';`);
        return true;
    }
    catch (error) {
        console.log('Error at Update ResetPassworToken');
        return false;
    }
};
exports.updateResetPassworToken = updateResetPassworToken;
const resetPasword = async (userId, updatedPassword) => {
    try {
        updatedPassword = await bcryptjs_1.default.hash(updatedPassword, 12);
        await psql_1.default.query(`UPDATE users SET password = '${updatedPassword}' WHERE id = '${userId}';`);
        return true;
    }
    catch (error) {
        console.log('Erro at reset password');
        return false;
    }
};
exports.resetPasword = resetPasword;
const passwordIsValid = async (email, passwordString) => {
    try {
        const hashUser = await psql_1.default.query(`SELECT password FROM users WHERE email = '${email}'`);
        const [{ password }] = hashUser.rows;
        return bcryptjs_1.default.compare(passwordString, password);
    }
    catch (error) {
        return false;
    }
};
exports.passwordIsValid = passwordIsValid;
