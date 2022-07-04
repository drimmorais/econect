import Pool from '../../psql';
import { INewSchedule } from '../../types/scheduleCollect';

export const getMaterial = async (category: string): Promise<any | false> => {
  try {
    const querygetPerfilUser = `SELECT id, description, key_aux FROM type_material WHERE category = '${category}'`;
    return await Pool.query(querygetPerfilUser);
  } catch (error) {
    console.log('Erro at get list material by category');
    return false;
  }
};

export const getCollectPoint = async (category: string[]): Promise<any | false> => {
  try {
    let pesquisa = '';
    const upperCategory = category.map((name) => name.toUpperCase());

    upperCategory.forEach((value) => {
      if (pesquisa !== '')
        pesquisa = pesquisa + `and '${value}' = ANY(types_of_materials_accepted) `;
      else pesquisa = pesquisa + ` '${value}' = ANY(types_of_materials_accepted) `;
    });
    const querygetPerfilUser = `SELECT  id, cnpj, social_reason, street || ' - ' || district as endereco, zipcode FROM collect_point WHERE  ${pesquisa} `;
    return await Pool.query(querygetPerfilUser);
  } catch (error) {
    console.log('Erro at get Collect point');
    return false;
  }
};

export const getDataByCreateSchedule = async (
  idChosenCollectionPoint: string,
): Promise<any> => {
  console.log('CHOSEN', idChosenCollectionPoint);
  try {
    const queryCompareHours = `SELECT hours_of_operation, operating_status, validation_status, days_of_operation, delivery_type FROM collect_point WHERE id = '${idChosenCollectionPoint}'`;
    const { rows } = await Pool.query(queryCompareHours);
    console.log('ROWS', rows);
    return rows;
  } catch (error) {
    console.log('ERROR', error);
    return false;
  }
};

export const createSchedule = async (
  newSchedule: INewSchedule,
): Promise<any | false> => {
  const queryInsert = `INSERT INTO schedule_collect (weight, note, schedule_date, schedule_hours, point_accumulated, delivery_type, price, collect_point_id, type_material_id, isrecyclable, amount)
  VALUES('{${newSchedule.weight}}', '${newSchedule.note}', '${newSchedule.schedule_date}', '${newSchedule.schedule_hours}', '${newSchedule.point_accumulated}', '${newSchedule.delivery_type}', 0, ${newSchedule.collect_point_id}, '{${newSchedule.type_material_id}}', ${newSchedule.isrecyclable}, ${newSchedule.amount} ) RETURNING id`;
  try {
    const { rows } = await Pool.query(queryInsert);
    return rows;
  } catch (error) {
    return false;
  }
};
