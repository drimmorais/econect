import {
  INewCollectPoint,
  IUpdateCollectPoint,
  IUpdatePasswordCollectPoint,
  IUpdateStatusCollectPoint,
} from '../../types/collectPoint';
import Pool from '../../psql';
import bcryptjs from 'bcryptjs';

const errors: string[] = [];

export const createCollectpont = async (
  newCollectPoint: INewCollectPoint,
): Promise<INewCollectPoint | boolean> => {
  try {
    const queryInsert = `INSERT INTO collect_point(cnpj, phone, biography, hours_of_operation, days_of_operation, city, uf, number, zipcode, district, street, delivery_type, user_id_fk, social_reason, types_of_materials_accepted)
      VALUES('${newCollectPoint.cnpj}', '${newCollectPoint.phone}', '${newCollectPoint.biography}',
      '${newCollectPoint.hours_of_operation}', '${newCollectPoint.days_of_operation}','${newCollectPoint.city}' , '${newCollectPoint.uf}',
      '${newCollectPoint.number}', '${newCollectPoint.zipcode}', '${newCollectPoint.district}',
      '${newCollectPoint.street}', '{${newCollectPoint.delivery_type}}','${newCollectPoint.user_id_fk}', '${newCollectPoint.social_reason}','{${newCollectPoint.types_of_materials_accepted}}');`;
    await Pool.query(queryInsert);
    return newCollectPoint;
  } catch (err) {
    return false;
  }
};

export const insertToValide = async (
  userId: string,
  alterCollectPoint: INewCollectPoint,
): Promise<INewCollectPoint | boolean> => {
  try {
    const queryInsert = `INSERT INTO validations_collect_point(cnpj,phone, biography, hours_of_operation, days_of_operation, city, uf, number, zipcode, district, street, delivery_type, user_id, social_reason, types_of_materials_accepted, validation_type)
      VALUES('${alterCollectPoint.cnpj}','${alterCollectPoint.phone}', '${alterCollectPoint.biography}',
      '${alterCollectPoint.hours_of_operation}', '${alterCollectPoint.days_of_operation}','${alterCollectPoint.city}' , '${alterCollectPoint.uf}',
      '${alterCollectPoint.number}', '${alterCollectPoint.zipcode}', '${alterCollectPoint.district}',
      '${alterCollectPoint.street}', '{${alterCollectPoint.delivery_type}}','${userId}', '${alterCollectPoint.social_reason}','{${alterCollectPoint.types_of_materials_accepted}}', 'mudança_de_perfil');`;
    await Pool.query(queryInsert);
    return alterCollectPoint;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const insertToChangeStatus = async (
  userId: string,
  alterStatusCollectPoint: IUpdateStatusCollectPoint,
): Promise<IUpdateStatusCollectPoint | boolean> => {
  try {
    const CollectPointId = await Pool.query(
      `SELECT cnpj, social_reason FROM collect_point WHERE user_id_fk = ${userId}`,
    );
    const queryInsert = `INSERT INTO validations_new_status_operation(cnpj,user_id, social_reason,new_status, comment, validation_type)
      VALUES('${CollectPointId.rows[0].cnpj}','${userId}', '${CollectPointId.rows[0].social_reason}', '${alterStatusCollectPoint.new_status}', '${alterStatusCollectPoint.comment}','mudança_de_status');`;
    await Pool.query(queryInsert);
    return alterStatusCollectPoint;
  } catch (err) {
    return false;
  }
};

export const updateCollectpoint = async (
  userId: string,
  updatedValues: IUpdateCollectPoint,
): Promise<any | boolean> => {
  try {
    const queryFinfByPk = `SELECT * FROM collect_point WHERE user_id_fk = ${userId}`;
    const users = await Pool.query(queryFinfByPk);

    if (!users) {
      errors.push('ID não enviado');
    }

    const queryUpdate = `UPDATE collect_point SET social_reason = '${updatedValues.social_reason}',phone = '${updatedValues.phone}', biography = '${updatedValues.biography}', hours_of_operation = '${updatedValues.hours_of_operation}',  days_of_operation = '${updatedValues.days_of_operation}', delivery_type = '{${updatedValues.delivery_type}}',city = '${updatedValues.city}', uf = '${updatedValues.uf}', number = '${updatedValues.number}', zipcode = '${updatedValues.zipcode}', district = '${updatedValues.district}', street = '${updatedValues.street}', types_of_materials_accepted = '{${updatedValues.types_of_materials_accepted}}' WHERE user_id_fk = '${userId}'; `;
    const updatedUser = await Pool.query(queryUpdate);
    return { ...updatedUser };
  } catch (error) {
    return false;
  }
};

export const updateStatusCollectpoint = async (
  userId: string,
  new_status: string,
): Promise<any | boolean> => {
  try {
    const queryFinfByPk = `SELECT * FROM collect_point WHERE user_id_fk = ${userId}`;
    const users = await Pool.query(queryFinfByPk);

    if (!users) {
      errors.push('ID não enviado');
    }

    const queryUpdate = `UPDATE collect_point SET operating_status = '${new_status}' WHERE user_id_fk = '${userId}'; `;
    const updatedUser = await Pool.query(queryUpdate);
    return { ...updatedUser };
  } catch (error) {
    return false;
  }
};

export const updatePasswordCollectPoint = async (
  userId: string,
  updatedValues: IUpdatePasswordCollectPoint,
): Promise<boolean> => {
  try {
    const hashUser = await Pool.query(
      `SELECT password FROM users WHERE id = '${userId}'`,
    );
    const [{ password }] = hashUser.rows;

    const isEqual = await bcryptjs.compare(updatedValues.password, password);
    if (!isEqual) return false;

    updatedValues.new_password = await bcryptjs.hash(updatedValues.new_password, 12);

    await Pool.query(
      `UPDATE users SET password = '${updatedValues.new_password}' WHERE id = '${userId}';`,
    );
    return true;
  } catch (error) {
    console.log('Error at update password of collect point');
    return false;
  }
};

export const getPerfil = async (userId: string): Promise<any | false> => {
  try {
    const querygetPerfilUser = `SELECT * FROM vw_collect_point WHERE id = '${userId}'`;
    return await Pool.query(querygetPerfilUser);
  } catch (error) {
    console.log('Erro at get Perfil');
    return false;
  }
};

export const getCollectPoint = async (): Promise<any | boolean> => {
  try {
    const querygetAd = `SELECT  social_reason, street || ' - ' || district as endereco, zipcode FROM collect_point `;

    return await Pool.query(querygetAd);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCollectPointByMaterial = async (
  materials: [],
): Promise<any | boolean> => {
  try {
    let pesquisa = '';

    materials.forEach((value) => {
      if (pesquisa !== '')
        pesquisa = pesquisa + `and '${value}' = ANY(types_of_materials_accepted) `;
      else pesquisa = pesquisa + ` '${value}' = ANY(types_of_materials_accepted) `;
    });

    const querygetAd = `SELECT  id, cnpj, social_reason, street || ' - ' || district as endereco, zipcode FROM collect_point WHERE  ${pesquisa} `;

    return await Pool.query(querygetAd);
  } catch (error) {
    console.log(error);
    return false;
  }
};


