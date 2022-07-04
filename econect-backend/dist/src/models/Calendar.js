"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPointCalendar = exports.getCitizenCalendar = void 0;
const psql_1 = __importDefault(require("../../psql"));
const getCitizenCalendar = async (userId, time_schedule) => {
    try {
        const citizenId = await psql_1.default.query(`SELECT id FROM citizen WHERE user_id_fk = ${userId}`);
        const queryGetCalendar = `SELECT * FROM vw_pending_collect WHERE citizen_id = '${citizenId.rows[0].id}' AND date_shedule = '${time_schedule}'`;
        return await psql_1.default.query(queryGetCalendar);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.getCitizenCalendar = getCitizenCalendar;
const getPointCalendar = async (userId, time_schedule) => {
    try {
        const collectPointId = await psql_1.default.query(`SELECT id FROM collect_point WHERE user_id_fk = ${userId}`);
        const queryGetCalendar = `SELECT * FROM vw_pending_collect WHERE collect_point_id = '${collectPointId.rows[0].id}' AND date_shedule = '${time_schedule}'`;
        return await psql_1.default.query(queryGetCalendar);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.getPointCalendar = getPointCalendar;
