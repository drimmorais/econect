"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveStatusChangePending = exports.getInfosChangeOfStatusByCnpj = exports.disapprovedUpdatesPending = exports.approveUpdatesPending = exports.getInfosUpdatesPendingByCnpj = exports.getAllUpdatePending = exports.getAllPosts = exports.createNewPost = exports.disapprovePendingCollectPoint = exports.approvePendingCollectPoint = exports.getInfosPendingCollectPointByCnpj = exports.getAllPendingCollectPoint = void 0;
const psql_1 = __importDefault(require("../../psql"));
const getAllPendingCollectPoint = async () => {
    try {
        const queryGetPending = `SELECT social_reason, cnpj FROM collect_point WHERE validation_status = 'PENDENTE'`;
        const { rows } = await psql_1.default.query(queryGetPending);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para pegar os pontos de coletas pendentes');
        return false;
    }
};
exports.getAllPendingCollectPoint = getAllPendingCollectPoint;
const getInfosPendingCollectPointByCnpj = async (cnpj) => {
    try {
        const queryInsert = `SELECT social_reason, cnpj, phone, street || ' - ' || district as endereco, hours_of_operation,days_of_operation, delivery_type, types_of_materials_accepted FROM collect_point
      WHERE cnpj = '${cnpj}' AND validation_status = 'PENDENTE'`;
        const { rows } = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para pegar as infos dos pontos de coletas pendentes');
        return false;
    }
};
exports.getInfosPendingCollectPointByCnpj = getInfosPendingCollectPointByCnpj;
const approvePendingCollectPoint = async (cnpj) => {
    try {
        const queryInsert = `UPDATE collect_point SET validation_status = 'APROVADO' WHERE cnpj = '${cnpj}'`;
        const rows = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para pegar as infos dos pontos de coletas pendentes');
        return false;
    }
};
exports.approvePendingCollectPoint = approvePendingCollectPoint;
const disapprovePendingCollectPoint = async (cnpj) => {
    try {
        const queryInsert = `UPDATE collect_point SET validation_status = 'REPROVADO' WHERE cnpj = '${cnpj}'`;
        const rows = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para pegar as infos dos pontos de coletas pendentes');
        return false;
    }
};
exports.disapprovePendingCollectPoint = disapprovePendingCollectPoint;
const createNewPost = async (infos_post) => {
    try {
        const queryInsert = `INSERT INTO ecoblog_posts(title, author, contents, creation_date)
    VALUES('${infos_post.title}', '${infos_post.author}', '${infos_post.contents}', NOW(  ))`;
        console.log(queryInsert);
        const rows = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para criar novo post do Eco blog');
        return false;
    }
};
exports.createNewPost = createNewPost;
const getAllPosts = async () => {
    try {
        const querySelect = `SELECT title, author, contents FROM ecoblog_posts`;
        const rows = await psql_1.default.query(querySelect);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para criar novo post do Eco blog');
        return false;
    }
};
exports.getAllPosts = getAllPosts;
const getAllUpdatePending = async () => {
    try {
        const queryUpdatePending = `SELECT social_reason, validation_type, cnpj FROM validations_collect_point WHERE validation_status = 'PENDENTE'`;
        const { rows } = await psql_1.default.query(queryUpdatePending);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para pegar os pontos de coletas pendentes que estão com updates pendentes', err);
        return false;
    }
};
exports.getAllUpdatePending = getAllUpdatePending;
const getInfosUpdatesPendingByCnpj = async (cnpj) => {
    try {
        const queryInsert = `SELECT social_reason, cnpj, phone,biography, hours_of_operation,days_of_operation, delivery_type, city, uf, number, zipcode, district, street, types_of_materials_accepted, user_id  FROM validations_collect_point
      WHERE cnpj = '${cnpj}' AND validation_status = 'PENDENTE'`;
        const { rows } = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para pegar as infos dos pontos de updates pendentes de coletas pendentes');
        return false;
    }
};
exports.getInfosUpdatesPendingByCnpj = getInfosUpdatesPendingByCnpj;
const approveUpdatesPending = async (cnpj) => {
    try {
        const queryUpdate = `UPDATE validations_collect_point SET validation_status = 'APROVADO' WHERE cnpj = '${cnpj}'`;
        const rows = await psql_1.default.query(queryUpdate);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para fazer o update na tabela validations_collect_point');
        return false;
    }
};
exports.approveUpdatesPending = approveUpdatesPending;
const disapprovedUpdatesPending = async (cnpj) => {
    try {
        const queryUpdate = `UPDATE validations_collect_point SET validation_status = 'REPROVADO' WHERE cnpj = '${cnpj}'`;
        const rows = await psql_1.default.query(queryUpdate);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para reprovar updates');
        return false;
    }
};
exports.disapprovedUpdatesPending = disapprovedUpdatesPending;
const getInfosChangeOfStatusByCnpj = async (cnpj) => {
    try {
        const queryInsert = `SELECT social_reason, cnpj, new_status, comment, validation_type, user_id FROM validations_new_status_operation
      WHERE cnpj = '${cnpj}' AND validation_status = 'PENDENTE'`;
        const { rows } = await psql_1.default.query(queryInsert);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para pegar as infos dos pontos de updates pendentes de coletas pendentes');
        return false;
    }
};
exports.getInfosChangeOfStatusByCnpj = getInfosChangeOfStatusByCnpj;
const approveStatusChangePending = async (cnpj) => {
    try {
        const queryUpdate = `UPDATE validations_new_status_operation SET validation_status = 'APROVADO' WHERE cnpj = '${cnpj}'`;
        const rows = await psql_1.default.query(queryUpdate);
        return rows;
    }
    catch (err) {
        console.log('Erro quando tentou rodar a query para atualizar a tabela validations_new_status_operation');
        return false;
    }
};
exports.approveStatusChangePending = approveStatusChangePending;
