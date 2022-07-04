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
exports.createSchedule = void 0;
const express_1 = __importDefault(require("express"));
const ScheduleCollect = __importStar(require("../models/ScheduleCollect"));
const PendingCollect_1 = require("../models/PendingCollect");
const levels_1 = require("../middlewares/levels");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get('/materialByCategory/:material', auth_1.default, levels_1.isCitizenAndCollectPoint, async (req, res) => {
    const category = req.params.material;
    const listMaterial = await ScheduleCollect.getMaterial(category.toLowerCase());
    if (!listMaterial) {
        return res.status(400).json({
            error: 'Error at get list material',
        });
    }
    else {
        res.status(200).json({ category, lista: listMaterial.rows });
    }
});
router.get('/collectPointByMaterialCategory/:param', auth_1.default, levels_1.isCitizen, async (req, res) => {
    const buildArray = req.params.param.split(',');
    const category = [];
    for (const item of buildArray) {
        category.push(item);
    }
    const listCollectPoint = await ScheduleCollect.getCollectPoint(category);
    if (!listCollectPoint) {
        return res.status(400).json({
            error: 'Error at get Collect Point',
        });
    }
    else {
        res.status(200).json(listCollectPoint.rows);
    }
});
router.post('/createSchedule/:userId', auth_1.default, levels_1.isCitizen, async (req, res) => {
    const result = await createSchedule(req.params.userId, req.body);
    console.log(result);
    res.json(result);
});
async function createSchedule(userId, infos_schedule) {
    const [newSchedule] = await ScheduleCollect.getDataByCreateSchedule(infos_schedule.collect_point_id);
    if (!newSchedule)
        return {
            created: false,
            msg: 'Verifique o id do ponto de coleta informado',
        };
    const type_delivery = newSchedule.delivery_type;
    if (!type_delivery.includes(infos_schedule.delivery_type))
        return {
            created: false,
            msg: 'O ponto de coleta escolhido não aceita esse tipo de entrega',
        };
    if (infos_schedule.weight.length && infos_schedule.type_material_id.length) {
        if (infos_schedule.weight.length !== infos_schedule.type_material_id.length) {
            return {
                created: false,
                msg: 'Por favor verifique se a quantidade de id de materias é igual a quantidade de pesos enviados, o contrario é verdadeiro',
            };
        }
    }
    if (infos_schedule.weight.length == 0 &&
        infos_schedule.type_material_id.length == 0) {
        if (infos_schedule.amount <= 0) {
            return {
                created: false,
                msg: 'Você esta tentando agendar uma coleta sem passar o peso ou quantidade do material ',
            };
        }
    }
    const hours_of_operation = newSchedule.hours_of_operation;
    const startOperationTime = hours_of_operation.split('-')[0].trim();
    const endOpertationTime = hours_of_operation.split('-')[1].trim();
    const days_of_operation = newSchedule.days_of_operation;
    const startOperationDay = days_of_operation.split(':')[0].trim();
    const endOpertationDay = days_of_operation.split(':')[1].trim();
    const inputDate = new Date(infos_schedule.schedule_date);
    const currentHours = new Date();
    const currentHoursFormated = currentHours.toTimeString().split(' ')[0];
    const weekDay = inputDate.getDay();
    const dayNumberStart = convertStartDay(startOperationDay);
    const dayNumberEnd = convertEndDay(endOpertationDay);
    if (inputDate.getDate() >= currentHours.getDate() &&
        inputDate.getMonth() >= currentHours.getMonth()) {
        if (newSchedule.operating_status === 'ATIVO' &&
            newSchedule.validation_status === 'APROVADO') {
            if (startOperationTime <= infos_schedule.schedule_hours &&
                infos_schedule.schedule_hours <= endOpertationTime &&
                dayNumberStart <= weekDay &&
                weekDay <= dayNumberEnd) {
                const aux = inputDate.toDateString();
                const aux1 = formatDate(aux).concat('T');
                const scheduledateTime = new Date(`${aux1}` + `${infos_schedule.schedule_hours}`);
                const scheduledateTimeFormated = scheduledateTime.getTime();
                const currentTimeFormated = currentHours.getTime();
                if (inputDate.toDateString() == currentHours.toDateString()) {
                    const diff = scheduledateTimeFormated - currentTimeFormated;
                    const minutes = Math.floor(diff / 60000);
                    if (minutes > 90 &&
                        currentHoursFormated <= infos_schedule.schedule_hours) {
                        const [{ id }] = await ScheduleCollect.createSchedule(infos_schedule);
                        if (id !== null) {
                            const createSchedulePending = await PendingCollect_1.createPendingCollect(userId, id, infos_schedule);
                            if (!createSchedulePending) {
                                return {
                                    created: false,
                                    msg: 'Problema na inserção da tabela pending_collect',
                                };
                            }
                            else {
                                return {
                                    created: true,
                                    msg: 'Seu agendamento foi feito com sucesso',
                                };
                            }
                        }
                        else {
                            return {
                                created: false,
                                msg: 'Problema na inserção da tabela schedule_collect',
                            };
                        }
                    }
                    else {
                        return {
                            created: false,
                            msg: 'O horario de agendamento tem que respeitar o limite de pelo menos 1 hora e 30 minutos ou a hora digitada é inferior a hora atual',
                        };
                    }
                }
                else {
                    const [{ id }] = await ScheduleCollect.createSchedule(infos_schedule);
                    if (id !== null) {
                        const createSchedulePending = await PendingCollect_1.createPendingCollect(userId, id, infos_schedule);
                        if (!createSchedulePending) {
                            return {
                                created: false,
                                msg: 'Problema na inserção da tabela pending_collect',
                            };
                        }
                        else {
                            return { created: true, msg: 'Seu agendamento foi feito com sucesso' };
                        }
                    }
                    else {
                        return {
                            created: false,
                            msg: 'Problema na inserção da tabela schedule_collect',
                        };
                    }
                }
            }
            else
                return {
                    created: false,
                    msg: 'O horário enviado não esta dentro do horario de funcionamento do ponto de coleta escolhido',
                };
        }
        else {
            return {
                created: false,
                msg: 'Esse ponto de coleta está inativo no momento e não pode receber agendamentos',
            };
        }
    }
    else {
        return {
            created: false,
            msg: 'O dia desejado para o agendamento é inferior ao dia atual',
        };
    }
}
exports.createSchedule = createSchedule;
function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
function convertStartDay(startOperationDay) {
    let numberDayStart;
    if (startOperationDay == 'Domingo')
        numberDayStart = 0;
    else if (startOperationDay == 'Segunda-feira')
        numberDayStart = 1;
    else if (startOperationDay == 'Terca-feira')
        numberDayStart = 2;
    else if (startOperationDay == 'Quarta-feira')
        numberDayStart = 3;
    else if (startOperationDay == 'Quinta-feira')
        numberDayStart = 4;
    else if (startOperationDay == 'Sexta-feira')
        numberDayStart = 5;
    else
        numberDayStart = 6;
    return numberDayStart;
}
function convertEndDay(endOpertationDay) {
    let numberDayStart;
    if (endOpertationDay == 'Domingo')
        numberDayStart = 0;
    else if (endOpertationDay == 'Segunda-feira')
        numberDayStart = 1;
    else if (endOpertationDay == 'Terca-feira')
        numberDayStart = 2;
    else if (endOpertationDay == 'Quarta-feira')
        numberDayStart = 3;
    else if (endOpertationDay == 'Quinta-feira')
        numberDayStart = 4;
    else if (endOpertationDay == 'Sexta-feira')
        numberDayStart = 5;
    else
        numberDayStart = 6;
    return numberDayStart;
}
exports.default = router;
