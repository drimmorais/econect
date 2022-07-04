"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelPendingCollect = exports.confirmPendingCollect = exports.unrealizedPendingCollect = exports.userConfirmPendingCollect = exports.progressPendingCollect = exports.createPendingCollect = void 0;
const psql_1 = __importDefault(require("../../psql"));
//AGENDAMENTO SOLICITADO PELO CIDADAO E PENDENTE DE ACEITAÇÃO DO PONTO DE COLETA
const createPendingCollect = async (userId, operation_id, newPending) => {
    try {
        const citizenCollect = await psql_1.default.query(`SELECT id FROM citizen WHERE user_id_fk = ${userId}`);
        console.log('USUARIO', citizenCollect);
        const queryInsert = `INSERT INTO pending_collect(citizen_id, collect_point_id, status, operation, operation_id)
	   VALUES ('${citizenCollect.rows[0].id}', '${newPending.collect_point_id}', 'PENDENTE', '${newPending.operation}', '${operation_id}'); `;
        await psql_1.default.query(queryInsert);
        return newPending;
    }
    catch (err) {
        return false;
    }
};
exports.createPendingCollect = createPendingCollect;
//AGENDAMENTO ACEITO PELO PONTO DE COLETA, EM PROCESSO DE ENTREGA/COLETA
const progressPendingCollect = async (userId, operation) => {
    try {
        const collectPointCollect = await psql_1.default.query(`SELECT id FROM collect_point WHERE user_id_fk = ${userId}`);
        const queryUpdate = `UPDATE pending_collect  SET status = 'EM ANDAMENTO' WHERE collect_point_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
        await psql_1.default.query(queryUpdate);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.progressPendingCollect = progressPendingCollect;
// USUÁRIO INFORMA QUE REALIZOU A ENTREGA OU QUE FOI COLETADO O MATERIAL
const userConfirmPendingCollect = async (userId, operation) => {
    try {
        const citizen = await psql_1.default.query(`SELECT id FROM citizen WHERE user_id_fk = ${userId}`);
        const queryConclude = `UPDATE pending_collect  SET status = 'ENTREGUE' WHERE citizen_id = '${citizen.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
        await psql_1.default.query(queryConclude);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.userConfirmPendingCollect = userConfirmPendingCollect;
// PONTO DE COLETA INFORMA QUE OPERAÇÃO NÃO FOI REALIZADA
const unrealizedPendingCollect = async (userId, operation) => {
    try {
        const collectPointCollect = await psql_1.default.query(`SELECT id FROM collect_point WHERE user_id_fk = ${userId}`);
        const queryConclude = `UPDATE pending_collect  SET status = 'NÃO REALIZADO' WHERE collect_point_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
        await psql_1.default.query(queryConclude);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.unrealizedPendingCollect = unrealizedPendingCollect;
// PONTO DE COLETA CONFIRMA A OPERAÇÃO, FOI REALIZADA COM SUCESSO
const confirmPendingCollect = async (userId, operation) => {
    try {
        const collectPointCollect = await psql_1.default.query(`SELECT id FROM collect_point WHERE user_id_fk = ${userId}`);
        const queryConclude = `UPDATE pending_collect  SET status = 'CONCLUIDO' WHERE collect_point_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
        await psql_1.default.query(queryConclude);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.confirmPendingCollect = confirmPendingCollect;
const cancelPendingCollect = async (userId, operation) => {
    try {
        const collectPointCollect = await psql_1.default.query(`SELECT id FROM citizen WHERE user_id_fk = ${userId}`);
        const queryConclude = `UPDATE pending_collect  SET status = 'CANCELADO' WHERE citizen_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
        await psql_1.default.query(queryConclude);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.cancelPendingCollect = cancelPendingCollect;
