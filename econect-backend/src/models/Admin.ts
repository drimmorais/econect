import Pool from '../../psql';
import { INewPost } from '../../types/ecoblogPosts';

export const getAllPendingCollectPoint = async (): Promise<any> => {
  try {
    const queryGetPending = `SELECT social_reason, cnpj FROM collect_point WHERE validation_status = 'PENDENTE'`;
    const { rows } = await Pool.query(queryGetPending);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para pegar os pontos de coletas pendentes',
    );
    return false;
  }
};

export const getInfosPendingCollectPointByCnpj = async (
  cnpj: string,
): Promise<any> => {
  try {
    const queryInsert = `SELECT social_reason, cnpj, phone, street || ' - ' || district as endereco, hours_of_operation,days_of_operation, delivery_type, types_of_materials_accepted FROM collect_point
      WHERE cnpj = '${cnpj}' AND validation_status = 'PENDENTE'`;

    const { rows } = await Pool.query(queryInsert);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para pegar as infos dos pontos de coletas pendentes',
    );
    return false;
  }
};

export const approvePendingCollectPoint = async (cnpj: string): Promise<any> => {
  try {
    const queryInsert = `UPDATE collect_point SET validation_status = 'APROVADO' WHERE cnpj = '${cnpj}'`;
    const rows = await Pool.query(queryInsert);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para pegar as infos dos pontos de coletas pendentes',
    );
    return false;
  }
};

export const disapprovePendingCollectPoint = async (cnpj: string): Promise<any> => {
  try {
    const queryInsert = `UPDATE collect_point SET validation_status = 'REPROVADO' WHERE cnpj = '${cnpj}'`;
    const rows = await Pool.query(queryInsert);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para pegar as infos dos pontos de coletas pendentes',
    );
    return false;
  }
};

export const createNewPost = async (infos_post: INewPost): Promise<any> => {
  try {
    const queryInsert = `INSERT INTO ecoblog_posts(title, author, contents, creation_date)
    VALUES('${infos_post.title}', '${infos_post.author}', '${infos_post.contents}', NOW(  ))`;
    console.log(queryInsert);
    const rows = await Pool.query(queryInsert);
    return rows;
  } catch (err) {
    console.log('Erro quando tentou rodar a query para criar novo post do Eco blog');
    return false;
  }
};

export const getAllPosts = async (): Promise<any> => {
  try {
    const querySelect = `SELECT title, author, contents FROM ecoblog_posts`;
    const rows = await Pool.query(querySelect);

    return rows;
  } catch (err) {
    console.log('Erro quando tentou rodar a query para criar novo post do Eco blog');
    return false;
  }
};

export const getAllUpdatePending = async (): Promise<any> => {
  try {
    const queryUpdatePending = `SELECT social_reason, validation_type, cnpj FROM validations_collect_point WHERE validation_status = 'PENDENTE'`;
    const { rows } = await Pool.query(queryUpdatePending);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para pegar os pontos de coletas pendentes que estão com updates pendentes',
      err,
    );
    return false;
  }
};

export const getInfosUpdatesPendingByCnpj = async (cnpj: string): Promise<any> => {
  try {
    const queryInsert = `SELECT social_reason, cnpj, phone,biography, hours_of_operation,days_of_operation, delivery_type, city, uf, number, zipcode, district, street, types_of_materials_accepted, user_id  FROM validations_collect_point
      WHERE cnpj = '${cnpj}' AND validation_status = 'PENDENTE'`;

    const { rows } = await Pool.query(queryInsert);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para pegar as infos dos pontos de updates pendentes de coletas pendentes',
    );
    return false;
  }
};

export const approveUpdatesPending = async (cnpj: string): Promise<any> => {
  try {
    const queryUpdate = `UPDATE validations_collect_point SET validation_status = 'APROVADO' WHERE cnpj = '${cnpj}'`;
    const rows = await Pool.query(queryUpdate);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para fazer o update na tabela validations_collect_point',
    );
    return false;
  }
};

export const disapprovedUpdatesPending = async (cnpj: string): Promise<any> => {
  try {
    const queryUpdate = `UPDATE validations_collect_point SET validation_status = 'REPROVADO' WHERE cnpj = '${cnpj}'`;
    const rows = await Pool.query(queryUpdate);
    return rows;
  } catch (err) {
    console.log('Erro quando tentou rodar a query para reprovar updates');
    return false;
  }
};

export const getInfosChangeOfStatusByCnpj = async (cnpj: string): Promise<any> => {
  try {
    const queryInsert = `SELECT social_reason, cnpj, new_status, comment, validation_type, user_id FROM validations_new_status_operation
      WHERE cnpj = '${cnpj}' AND validation_status = 'PENDENTE'`;

    const { rows } = await Pool.query(queryInsert);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para pegar as infos dos pontos de updates pendentes de coletas pendentes',
    );
    return false;
  }
};

export const approveStatusChangePending = async (cnpj: string): Promise<any> => {
  try {
    const queryUpdate = `UPDATE validations_new_status_operation SET validation_status = 'APROVADO' WHERE cnpj = '${cnpj}'`;
    const rows = await Pool.query(queryUpdate);
    return rows;
  } catch (err) {
    console.log(
      'Erro quando tentou rodar a query para atualizar a tabela validations_new_status_operation',
    );
    return false;
  }
};

export const getReportSchedulesTypeMaterial = async (
  typeMaterial: string,
  dateStart: string,
  dateEnd: string,
): Promise<any | boolean> => {
  try {

    const querygetAd = `SELECT * FROM schedule_collect WHERE ${typeMaterial} = ANY(type_material_id) AND schedule_date BETWEEN '${dateStart}' AND '${dateEnd}' `;
    console.log(querygetAd)

    return await Pool.query(querygetAd);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getReportSchedules = async (
  dateStart: string,
  dateEnd: string,
): Promise<any | boolean> => {
  try {

    const querygetAd = `SELECT * FROM schedule_collect WHERE schedule_date BETWEEN '${dateStart}' AND '${dateEnd}' `;

    return await Pool.query(querygetAd);
  } catch (error) {
    console.log(error);
    return false;
  }
};