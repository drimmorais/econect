import Pool from '../../psql';
import { IProgressPendingCollect } from '../../types/pendingCollect';
import { INewSchedule } from '../../types/scheduleCollect';

//AGENDAMENTO SOLICITADO PELO CIDADAO E PENDENTE DE ACEITAÇÃO DO PONTO DE COLETA

export const createPendingCollect = async (
  userId: string,
  operation_id: string,
  newPending: INewSchedule,
): Promise<INewSchedule | boolean> => {
  try {
    const citizenCollect = await Pool.query(
      `SELECT id FROM citizen WHERE user_id_fk = ${userId}`,
    );
    console.log('USUARIO', citizenCollect);
    const queryInsert = `INSERT INTO pending_collect(citizen_id, collect_point_id, status, operation, operation_id)
	   VALUES ('${citizenCollect.rows[0].id}', '${newPending.collect_point_id}', 'PENDENTE', '${newPending.operation}', '${operation_id}'); `;
    await Pool.query(queryInsert);

    return newPending;
  } catch (err) {
    return false;
  }
};

//AGENDAMENTO ACEITO PELO PONTO DE COLETA, EM PROCESSO DE ENTREGA/COLETA

export const progressPendingCollect = async (
  userId: string,
  operation: IProgressPendingCollect,
): Promise<IProgressPendingCollect | boolean> => {
  try {
    const collectPointCollect = await Pool.query(
      `SELECT id FROM collect_point WHERE user_id_fk = ${userId}`,
    );

    const queryUpdate = `UPDATE pending_collect  SET status = 'EM ANDAMENTO' WHERE collect_point_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
    await Pool.query(queryUpdate);

    return true;
  } catch (err) {
    return false;
  }
};

// USUÁRIO INFORMA QUE REALIZOU A ENTREGA OU QUE FOI COLETADO O MATERIAL

export const userConfirmPendingCollect = async (
  userId: string,
  operation: IProgressPendingCollect,
): Promise<IProgressPendingCollect | boolean> => {
  try {
    const citizen = await Pool.query(
      `SELECT id FROM citizen WHERE user_id_fk = ${userId}`,
    );

    const queryConclude = `UPDATE pending_collect  SET status = 'ENTREGUE' WHERE citizen_id = '${citizen.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
    await Pool.query(queryConclude);

    return true;
  } catch (err) {
    return false;
  }
};

// PONTO DE COLETA INFORMA QUE OPERAÇÃO NÃO FOI REALIZADA

export const unrealizedPendingCollect = async (
  userId: string,
  operation: IProgressPendingCollect,
): Promise<IProgressPendingCollect | boolean> => {
  try {
    const collectPointCollect = await Pool.query(
      `SELECT id FROM collect_point WHERE user_id_fk = ${userId}`,
    );

    const queryConclude = `UPDATE pending_collect  SET status = 'NÃO REALIZADO' WHERE collect_point_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
    await Pool.query(queryConclude);

    return true;
  } catch (err) {
    return false;
  }
};

// PONTO DE COLETA CONFIRMA A OPERAÇÃO, FOI REALIZADA COM SUCESSO

export const confirmPendingCollect = async (
  userId: string,
  operation: IProgressPendingCollect,
): Promise<IProgressPendingCollect | boolean> => {
  try {
    const collectPointCollect = await Pool.query(
      `SELECT id FROM collect_point WHERE user_id_fk = ${userId}`,
    );

    const queryConclude = `UPDATE pending_collect  SET status = 'CONCLUIDO' WHERE collect_point_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
    await Pool.query(queryConclude);

    return true;
  } catch (err) {
    return false;
  }
};

export const cancelPendingCollect = async (
  userId: string,
  operation: IProgressPendingCollect,
): Promise<IProgressPendingCollect | boolean> => {
  try {
    const collectPointCollect = await Pool.query(
      `SELECT id FROM citizen WHERE user_id_fk = ${userId}`,
    );

    const queryConclude = `UPDATE pending_collect  SET status = 'CANCELADO' WHERE citizen_id = '${collectPointCollect.rows[0].id}' and operation_id = '${operation.operation_id}'   `;
    await Pool.query(queryConclude);

    return true;
  } catch (err) {
    return false;
  }
};
