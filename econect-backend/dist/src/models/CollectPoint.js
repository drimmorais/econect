"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectPointByMaterial = exports.getCollectPoint = exports.getPerfil = exports.updatePasswordCollectPoint = exports.updateStatusCollectpoint = exports.updateCollectpoint = exports.insertToChangeStatus = exports.insertToValide = exports.createCollectpont = void 0;
const psql_1 = __importDefault(require("../../psql"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors = [];
const createCollectpont = async (newCollectPoint) => {
    try {
        const queryInsert = `INSERT INTO collect_point(cnpj, phone, biography, hours_of_operation, days_of_operation, city, uf, number, zipcode, district, street, delivery_type, user_id_fk, social_reason, types_of_materials_accepted)
      VALUES('${newCollectPoint.cnpj}', '${newCollectPoint.phone}', '${newCollectPoint.biography}',
      '${newCollectPoint.hours_of_operation}', '${newCollectPoint.days_of_operation}','${newCollectPoint.city}' , '${newCollectPoint.uf}',
      '${newCollectPoint.number}', '${newCollectPoint.zipcode}', '${newCollectPoint.district}',
      '${newCollectPoint.street}', '{${newCollectPoint.delivery_type}}','${newCollectPoint.user_id_fk}', '${newCollectPoint.social_reason}','{${newCollectPoint.types_of_materials_accepted}}');`;
        await psql_1.default.query(queryInsert);
        return newCollectPoint;
    }
    catch (err) {
        return false;
    }
};
exports.createCollectpont = createCollectpont;
const insertToValide = async (userId, alterCollectPoint) => {
    try {
        const queryInsert = `INSERT INTO validations_collect_point(cnpj,phone, biography, hours_of_operation, days_of_operation, city, uf, number, zipcode, district, street, delivery_type, user_id, social_reason, types_of_materials_accepted, validation_type)
      VALUES('${alterCollectPoint.cnpj}','${alterCollectPoint.phone}', '${alterCollectPoint.biography}',
      '${alterCollectPoint.hours_of_operation}', '${alterCollectPoint.days_of_operation}','${alterCollectPoint.city}' , '${alterCollectPoint.uf}',
      '${alterCollectPoint.number}', '${alterCollectPoint.zipcode}', '${alterCollectPoint.district}',
      '${alterCollectPoint.street}', '{${alterCollectPoint.delivery_type}}','${userId}', '${alterCollectPoint.social_reason}','{${alterCollectPoint.types_of_materials_accepted}}', 'mudança_de_perfil');`;
        await psql_1.default.query(queryInsert);
        return alterCollectPoint;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.insertToValide = insertToValide;
const insertToChangeStatus = async (userId, alterStatusCollectPoint) => {
    try {
        const CollectPointId = await psql_1.default.query(`SELECT cnpj, social_reason FROM collect_point WHERE user_id_fk = ${userId}`);
        const queryInsert = `INSERT INTO validations_new_status_operation(cnpj,user_id, social_reason,new_status, comment, validation_type)
      VALUES('${CollectPointId.rows[0].cnpj}','${userId}', '${CollectPointId.rows[0].social_reason}', '${alterStatusCollectPoint.new_status}', '${alterStatusCollectPoint.comment}','mudança_de_status');`;
        await psql_1.default.query(queryInsert);
        return alterStatusCollectPoint;
    }
    catch (err) {
        return false;
    }
};
exports.insertToChangeStatus = insertToChangeStatus;
const updateCollectpoint = async (userId, updatedValues) => {
    try {
        const queryFinfByPk = `SELECT * FROM collect_point WHERE user_id_fk = ${userId}`;
        const users = await psql_1.default.query(queryFinfByPk);
        if (!users) {
            errors.push('ID não enviado');
        }
        const queryUpdate = `UPDATE collect_point SET social_reason = '${updatedValues.social_reason}',phone = '${updatedValues.phone}', biography = '${updatedValues.biography}', hours_of_operation = '${updatedValues.hours_of_operation}',  days_of_operation = '${updatedValues.days_of_operation}', delivery_type = '{${updatedValues.delivery_type}}',city = '${updatedValues.city}', uf = '${updatedValues.uf}', number = '${updatedValues.number}', zipcode = '${updatedValues.zipcode}', district = '${updatedValues.district}', street = '${updatedValues.street}', types_of_materials_accepted = '{${updatedValues.types_of_materials_accepted}}' WHERE user_id_fk = '${userId}'; `;
        const updatedUser = await psql_1.default.query(queryUpdate);
        return { ...updatedUser };
    }
    catch (error) {
        return false;
    }
};
exports.updateCollectpoint = updateCollectpoint;
const updateStatusCollectpoint = async (userId, new_status) => {
    try {
        const queryFinfByPk = `SELECT * FROM collect_point WHERE user_id_fk = ${userId}`;
        const users = await psql_1.default.query(queryFinfByPk);
        if (!users) {
            errors.push('ID não enviado');
        }
        const queryUpdate = `UPDATE collect_point SET operating_status = '${new_status}' WHERE user_id_fk = '${userId}'; `;
        const updatedUser = await psql_1.default.query(queryUpdate);
        return { ...updatedUser };
    }
    catch (error) {
        return false;
    }
};
exports.updateStatusCollectpoint = updateStatusCollectpoint;
const updatePasswordCollectPoint = async (userId, updatedValues) => {
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
        console.log('Error at update password of collect point');
        return false;
    }
};
exports.updatePasswordCollectPoint = updatePasswordCollectPoint;
const getPerfil = async (userId) => {
    try {
        const querygetPerfilUser = `SELECT * FROM vw_collect_point WHERE id = '${userId}'`;
        return await psql_1.default.query(querygetPerfilUser);
    }
    catch (error) {
        console.log('Erro at get Perfil');
        return false;
    }
};
exports.getPerfil = getPerfil;
const getCollectPoint = async () => {
    try {
        const querygetAd = `SELECT  social_reason, street || ' - ' || district as endereco, zipcode FROM collect_point `;
        return await psql_1.default.query(querygetAd);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.getCollectPoint = getCollectPoint;
const getCollectPointByMaterial = async (materials) => {
    try {
        let pesquisa = '';
        materials.forEach((value) => {
            if (pesquisa !== '')
                pesquisa = pesquisa + `and '${value}' = ANY(types_of_materials_accepted) `;
            else
                pesquisa = pesquisa + ` '${value}' = ANY(types_of_materials_accepted) `;
        });
        const querygetAd = `SELECT  id, cnpj, social_reason, street || ' - ' || district as endereco, zipcode FROM collect_point WHERE  ${pesquisa} `;
        return await psql_1.default.query(querygetAd);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.getCollectPointByMaterial = getCollectPointByMaterial;
