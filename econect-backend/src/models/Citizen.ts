import {
  INewCitizen,
  IUpdateCitizen,
  IUpdatePasswordCitizen,
} from '../../types/citizen';
import Pool from '../../psql';
import bcryptjs from 'bcryptjs';
import { error } from 'node:console';

export const createCitizen = async (
  newCitizen: INewCitizen,
): Promise<INewCitizen | any> => {
  try {
    const queryInsert = `INSERT INTO citizen(cpf, phone, biography, city, uf, number, zipcode, district, street, user_id_fk)
      VALUES('${newCitizen.cpf}', '${newCitizen.phone}', '${newCitizen.biography}','${newCitizen.city}', '${newCitizen.uf}', '${newCitizen.number}' , '${newCitizen.zipcode}' ,'${newCitizen.district}', '${newCitizen.street}', '${newCitizen.user_id}');`;
    await Pool.query(queryInsert);
    return newCitizen;
  } catch (err) {
    return err;
  }
};

export const updateCitizen = async (
  userId: string,
  updatedValues: IUpdateCitizen,
): Promise<any | boolean> => {
  try {
    const queryFinfByPk = `SELECT * FROM citizen WHERE user_id_fk = ${userId}`;

    const users = await Pool.query(queryFinfByPk);

    if (!users) return;

    const queryUpdate = `UPDATE citizen SET phone = '${updatedValues.phone}', biography = '${updatedValues.biography}', city = '${updatedValues.city}', uf = '${updatedValues.uf}', number = '${updatedValues.number}', zipcode = '${updatedValues.zipcode}', district = '${updatedValues.district}', street = '${updatedValues.street}' WHERE user_id_fk = '${userId}';`;

    const updatedUser = await Pool.query(queryUpdate);
    return updatedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPerfil = async (userId: string): Promise<any | false> => {
  try {
    const querygetPerfilUser = `SELECT * FROM vw_citizen WHERE id = '${userId}'`;
    return await Pool.query(querygetPerfilUser);
  } catch (error) {
    console.log('Erro at get Perfil');
    return false;
  }
};

export const updatePasswordCitizen = async (
  userId: string,
  updatedValues: IUpdatePasswordCitizen,
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
    console.log('Error at update citizen');
    return false;
  }
};
