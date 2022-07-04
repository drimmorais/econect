"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordCitizen = exports.getPerfil = exports.updateCitizen = exports.createCitizen = void 0;
const psql_1 = __importDefault(require("../../psql"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createCitizen = async (newCitizen) => {
    try {
        const queryInsert = `INSERT INTO citizen(cpf, phone, biography, city, uf, number, zipcode, district, street, user_id_fk)
      VALUES('${newCitizen.cpf}', '${newCitizen.phone}', '${newCitizen.biography}','${newCitizen.city}', '${newCitizen.uf}', '${newCitizen.number}' , '${newCitizen.zipcode}' ,'${newCitizen.district}', '${newCitizen.street}', '${newCitizen.user_id}');`;
        await psql_1.default.query(queryInsert);
        return newCitizen;
    }
    catch (err) {
        return err;
    }
};
exports.createCitizen = createCitizen;
const updateCitizen = async (userId, updatedValues) => {
    try {
        const queryFinfByPk = `SELECT * FROM citizen WHERE user_id_fk = ${userId}`;
        const users = await psql_1.default.query(queryFinfByPk);
        if (!users)
            return;
        const queryUpdate = `UPDATE citizen SET phone = '${updatedValues.phone}', biography = '${updatedValues.biography}', city = '${updatedValues.city}', uf = '${updatedValues.uf}', number = '${updatedValues.number}', zipcode = '${updatedValues.zipcode}', district = '${updatedValues.district}', street = '${updatedValues.street}' WHERE user_id_fk = '${userId}';`;
        const updatedUser = await psql_1.default.query(queryUpdate);
        return updatedUser;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.updateCitizen = updateCitizen;
const getPerfil = async (userId) => {
    try {
        const querygetPerfilUser = `SELECT * FROM vw_citizen WHERE id = '${userId}'`;
        return await psql_1.default.query(querygetPerfilUser);
    }
    catch (error) {
        console.log('Erro at get Perfil');
        return false;
    }
};
exports.getPerfil = getPerfil;
const updatePasswordCitizen = async (userId, updatedValues) => {
    try {
        const hashUser = await psql_1.default.query(`SELECT password FROM users WHERE id = '${userId}'`);
        const [{ password }] = hashUser.rows;
        const isEqual = await bcryptjs_1.default.compare(updatedValues.password, password);
        if (!isEqual)
            return false;
        updatedValues.new_password = await bcryptjs_1.default.hash(updatedValues.new_password, 12);
        await psql_1.default.query(`UPDATE users SET password = '${updatedValues.new_password}' WHERE id = '${userId}';`);
        return true;
    }
    catch (error) {
        console.log('Error at update citizen');
        return false;
    }
};
exports.updatePasswordCitizen = updatePasswordCitizen;
