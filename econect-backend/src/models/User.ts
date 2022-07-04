import { INewUser, IUpdateUser, IUpdatePasswordResetToken } from '../../types/user';
import Pool from '../../psql';
import bcryptjs from 'bcryptjs';

export const createGenericUser = async (newUser: INewUser): Promise<any> => {
  try {
    newUser.password = await bcryptjs.hash(newUser.password, 12);
    const queryInsert = `INSERT INTO users(email, username, name, password, typeuser, image, creationDate)
      VALUES('${newUser.email}', '${newUser.username}', '${newUser.name}', '${newUser.password}' , '${newUser.typeuser}', '${newUser.image}', NOW(  )) RETURNING id, typeuser;`;

    const { rows } = await Pool.query(queryInsert);
    return rows;
  } catch (err) {
    console.log('Erro quando tentou rodar a query para inserção de dados', err);
    return false;
  }
};

export const findUser = async (email: string): Promise<any> => {
  try {
    const queryfindUserForLogin = `SELECT * FROM users WHERE email = '${email}'`;
    const { rows } = await Pool.query(queryfindUserForLogin);
    return rows;
  } catch (error) {
    console.log('Não foi possivel obter nenhum usuario com o email informado');
    return;
  }
};

export const getUserById = async (id?: string): Promise<any> => {
  try {
    const queryfindUserForLogin = `SELECT * FROM users WHERE id = ${id}`;
    const { rows } = await Pool.query(queryfindUserForLogin);
    return rows;
  } catch (error) {
    console.log('Não foi possivel obter nenhum usuario com o id informado');
    return;
  }
};

export const updateUser = async (
  userId: string,
  updatedValues: IUpdateUser,
): Promise<boolean> => {
  try {
    const users = await Pool.query(`SELECT * FROM users WHERE id = '${userId}'`);

    if (users.rows.length == 0) return false;

    const queryUpdate = `UPDATE users SET email = '${updatedValues.email}', username = '${updatedValues.username}', name = '${updatedValues.name}', image = '${updatedValues.image}' WHERE id = '${userId}';`;

    await Pool.query(queryUpdate);
    return true;
  } catch (error) {
    console.log('Não foi possivel atualizar os dados');
    return false;
  }
};

export const updateResetPassworToken = async (
  userId: string,
  updatedResetPassworToken: IUpdatePasswordResetToken,
): Promise<boolean> => {
  try {
    await Pool.query(
      `UPDATE users SET passwordResetToken = '${updatedResetPassworToken}' WHERE id = '${userId}';`,
    );
    return true;
  } catch (error) {
    console.log('Error at Update ResetPassworToken');
    return false;
  }
};

export const resetPasword = async (
  userId: string,
  updatedPassword: string,
): Promise<boolean> => {
  try {
    updatedPassword = await bcryptjs.hash(updatedPassword, 12);

    await Pool.query(
      `UPDATE users SET password = '${updatedPassword}' WHERE id = '${userId}';`,
    );
    return true;
  } catch (error) {
    console.log('Erro at reset password');
    return false;
  }
};

export const passwordIsValid = async (
  email: string,
  passwordString: string,
): Promise<boolean> => {
  try {
    const hashUser = await Pool.query(
      `SELECT password FROM users WHERE email = '${email}'`,
    );
    const [{ password }] = hashUser.rows;
    return bcryptjs.compare(passwordString, password);
  } catch (error) {
    return false;
  }
};
