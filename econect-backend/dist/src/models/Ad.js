"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnAdWeigth = exports.validationAd = exports.getAd = exports.deleteAd = exports.updateAd = exports.createAd = void 0;
const psql_1 = __importDefault(require("../../psql"));
const createAd = async (userId, newAd) => {
    try {
        const collectPoint = await psql_1.default.query(`SELECT id FROM collect_point WHERE user_id_fk = ${userId}`);
        let queryInsert;
        if (newAd.type_material_id)
            queryInsert = `INSERT INTO ad(type, closing_date, isrecyclable, content, title, collect_point_id, type_material_id, quantity, price, minimum)
	   VALUES ('${newAd.type}', '${newAd.closing_date}', '${newAd.isrecyclable}', '${newAd.content}', '${newAd.title}', ${collectPoint.rows[0].id}, ${newAd.type_material_id}, '${newAd.quantity}', ${newAd.price}, ${newAd.minimum}); `;
        else
            queryInsert = `INSERT INTO ad(type, closing_date, isrecyclable, content, title, collect_point_id, quantity, price, minimum)
	   VALUES ('${newAd.type}', '${newAd.closing_date}', '${newAd.isrecyclable}', '${newAd.content}', '${newAd.title}', ${collectPoint.rows[0].id}, '${newAd.quantity}', ${newAd.price}, ${newAd.minimum}); `;
        await psql_1.default.query(queryInsert);
        return newAd;
    }
    catch (err) {
        return false;
    }
};
exports.createAd = createAd;
const updateAd = async (userId, updatedValues) => {
    try {
        const user = await psql_1.default.query(`SELECT * FROM collect_point WHERE user_id_fk = '${userId}'`);
        if (user.rows.length == 0)
            return false;
        const queryUpdate = `UPDATE ad SET title = '${updatedValues.title}', content = '${updatedValues.content}', completion_status = '${updatedValues.completion_status}', quantity = '${updatedValues.quantity}', price = '${updatedValues.price}', type = '${updatedValues.type}', closing_date = '${updatedValues.closing_date}' WHERE collect_point_id = ${userId};`;
        await psql_1.default.query(queryUpdate);
        return true;
    }
    catch (error) {
        console.log('Não foi possivel atualizar os dados');
        return false;
    }
};
exports.updateAd = updateAd;
const deleteAd = async (adId) => {
    try {
        const queryUpdate = `DELETE FROM ad WHERE id = ${adId};`;
        await psql_1.default.query(queryUpdate);
        return true;
    }
    catch (error) {
        console.log('Não foi possivel atualizar os dados');
        return false;
    }
};
exports.deleteAd = deleteAd;
const getAd = async () => {
    try {
        const querygetAd = `SELECT * FROM ad`;
        return await psql_1.default.query(querygetAd);
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.getAd = getAd;
const validationAd = async (userId, adValues) => {
    try {
        const { rows } = await psql_1.default.query(`SELECT * FROM ad WHERE id = '${adValues.ad_id}'`);
        if (rows.length == 0)
            return 'Falha ao consultar anúncio';
        const adValidate = rows[0];
        if (adValues.minimum < adValidate.minimum)
            return {
                validation: false,
                erro: 'Peso/quantidade inserido é menor do que o esperado ',
            };
        if (adValues.isrecyclable) {
            if (adValidate.quantity - adValidate.current_quantity <
                parseFloat(adValues.weight[0]))
                return { validation: false, erro: 'Quantidade informada é inválida' };
            if (adValidate.type == 'DOAÇÃO' && parseFloat(adValidate.price) > 0)
                return { validation: false, erro: 'Doação não deve conter preço' };
            try {
                const newValue = adValues.weight[0] + adValidate.current_quantity;
                const queryUpdate = `UPDATE ad SET current_quantity = '${newValue}' WHERE id = ${adValues.ad_id};`;
                await psql_1.default.query(queryUpdate);
            }
            catch (error) {
                return {
                    validation: false,
                    erro: 'Ops, algo deu errado na transação! Tente novamente.',
                };
            }
        }
        else {
            if (adValidate.quantity - adValidate.current_quantity < adValues.amount)
                return { validation: false, erro: 'Quantidade informada é inválida' };
            if (adValidate.type == 'DOAÇÃO' && parseFloat(adValidate.price) > 0)
                return { validation: false, erro: 'Doação não deve conter preço' };
            try {
                const newValue = adValues.amount + adValidate.current_quantity;
                const queryUpdate = `UPDATE ad SET current_quantity = '${newValue}' WHERE id = ${adValues.ad_id};`;
                await psql_1.default.query(queryUpdate);
            }
            catch (error) {
                return {
                    validation: false,
                    erro: 'Ops, algo deu errado na transação! Tente novamente.',
                };
            }
        }
        return { citizen: userId, schedule: rows, validation: true };
    }
    catch (error) {
        console.log('Não foi possivel validar os dados');
        return false;
    }
};
exports.validationAd = validationAd;
const returnAdWeigth = async (adValues) => {
    try {
        const { rows } = await psql_1.default.query(`SELECT * FROM ad WHERE id = '${adValues.ad_id}'`);
        const adValidate = rows[0];
        let newValue = 0;
        if (adValues.isrecyclable)
            newValue = adValidate.current_quantity - parseFloat(adValues.weight[0]);
        else
            newValue = adValidate.current_quantity - adValues.amount;
        const queryUpdate = `UPDATE ad SET current_quantity = '${newValue}' WHERE id = ${adValues.ad_id};`;
        await psql_1.default.query(queryUpdate);
    }
    catch (error) {
        console.log('Não foi possivel validar os dados');
        return false;
    }
};
exports.returnAdWeigth = returnAdWeigth;
