"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchedule = exports.getDataByCreateSchedule = exports.getCollectPoint = exports.getMaterial = void 0;
const psql_1 = __importDefault(require("../../psql"));
const getMaterial = async (category) => {
    try {
        const querygetPerfilUser = `SELECT id, description, key_aux FROM type_material WHERE category = '${category}'`;
        return await psql_1.default.query(querygetPerfilUser);
    }
    catch (error) {
        console.log('Erro at get list material by category');
        return false;
    }
};
exports.getMaterial = getMaterial;
const getCollectPoint = async (category) => {
    try {
        let pesquisa = '';
        const upperCategory = category.map((name) => name.toUpperCase());
        upperCategory.forEach((value) => {
            if (pesquisa !== '')
                pesquisa = pesquisa + `and '${value}' = ANY(types_of_materials_accepted) `;
            else
                pesquisa = pesquisa + ` '${value}' = ANY(types_of_materials_accepted) `;
        });
        const querygetPerfilUser = `SELECT  id, cnpj, social_reason, street || ' - ' || district as endereco, zipcode FROM collect_point WHERE  ${pesquisa} `;
        return await psql_1.default.query(querygetPerfilUser);
    }
    catch (error) {
        console.log('Erro at get Collect point');
        return false;
    }
};
exports.getCollectPoint = getCollectPoint;
const getDataByCreateSchedule = async (idChosenCollectionPoint) => {
    console.log('CHOSEN', idChosenCollectionPoint);
    try {
        const queryCompareHours = `SELECT hours_of_operation, operating_status, validation_status, days_of_operation, delivery_type FROM collect_point WHERE id = '${idChosenCollectionPoint}'`;
        const { rows } = await psql_1.default.query(queryCompareHours);
        console.log('ROWS', rows);
        return rows;
    }
    catch (error) {
        console.log('ERROR', error);
        return false;
    }
};
exports.getDataByCreateSchedule = getDataByCreateSchedule;
const createSchedule = async (newSchedule) => {
    const queryInsert = `INSERT INTO schedule_collect (weight, note, schedule_date, schedule_hours, point_accumulated, delivery_type, price, collect_point_id, type_material_id, isrecyclable, amount)
  VALUES('{${newSchedule.weight}}', '${newSchedule.note}', '${newSchedule.schedule_date}', '${newSchedule.schedule_hours}', '${newSchedule.point_accumulated}', '${newSchedule.delivery_type}', 0, ${newSchedule.collect_point_id}, '{${newSchedule.type_material_id}}', ${newSchedule.isrecyclable}, ${newSchedule.amount} ) RETURNING id`;
    try {
        const { rows } = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (error) {
        return false;
    }
};
exports.createSchedule = createSchedule;
