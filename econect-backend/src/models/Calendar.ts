import Pool from '../../psql';

export const getCitizenCalendar = async (
  userId: string,
  time_schedule: string,
): Promise<any | boolean> => {
  try {
    const citizenId = await Pool.query(
      `SELECT id FROM citizen WHERE user_id_fk = ${userId}`,
    );

    const queryGetCalendar = `SELECT * FROM vw_pending_collect WHERE citizen_id = '${citizenId.rows[0].id}' AND date_shedule = '${time_schedule}'`;
    return await Pool.query(queryGetCalendar);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPointCalendar = async (
  userId: string,
  time_schedule: string,
): Promise<any | boolean> => {
  try {
    const collectPointId = await Pool.query(
      `SELECT id FROM collect_point WHERE user_id_fk = ${userId}`,
    );

    const queryGetCalendar = `SELECT * FROM vw_pending_collect WHERE collect_point_id = '${collectPointId.rows[0].id}' AND date_shedule = '${time_schedule}'`;
    return await Pool.query(queryGetCalendar);
  } catch (error) {
    console.log(error);
    return false;
  }
};
