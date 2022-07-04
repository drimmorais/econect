import Pool from '../../psql';
import { INewAd, ISendAd, IUpdateAd } from '../../types/ad';

export const createAd = async (
  userId: string,
  newAd: INewAd,
): Promise<INewAd | boolean> => {
  try {
    const collectPoint = await Pool.query(
      `SELECT id FROM collect_point WHERE user_id_fk = ${userId}`,
    );

    let queryInsert;
    if (newAd.type_material_id)
      queryInsert = `INSERT INTO ad(type, closing_date, isrecyclable, content, title, collect_point_id, type_material_id, quantity, price, minimum)
	   VALUES ('${newAd.type}', '${newAd.closing_date}', '${newAd.isrecyclable}', '${newAd.content}', '${newAd.title}', ${collectPoint.rows[0].id}, ${newAd.type_material_id}, '${newAd.quantity}', ${newAd.price}, ${newAd.minimum}); `;
    else
      queryInsert = `INSERT INTO ad(type, closing_date, isrecyclable, content, title, collect_point_id, quantity, price, minimum)
	   VALUES ('${newAd.type}', '${newAd.closing_date}', '${newAd.isrecyclable}', '${newAd.content}', '${newAd.title}', ${collectPoint.rows[0].id}, '${newAd.quantity}', ${newAd.price}, ${newAd.minimum}); `;

    await Pool.query(queryInsert);
    return newAd;
  } catch (err) {
    return false;
  }
};

export const updateAd = async (
  userId: string,
  updatedValues: IUpdateAd,
): Promise<boolean> => {
  try {
    const user = await Pool.query(
      `SELECT * FROM collect_point WHERE user_id_fk = '${userId}'`,
    );

    if (user.rows.length == 0) return false;

    const queryUpdate = `UPDATE ad SET title = '${updatedValues.title}', content = '${updatedValues.content}', completion_status = '${updatedValues.completion_status}', quantity = '${updatedValues.quantity}', price = '${updatedValues.price}', type = '${updatedValues.type}', closing_date = '${updatedValues.closing_date}' WHERE collect_point_id = ${userId};`;

    await Pool.query(queryUpdate);
    return true;
  } catch (error) {
    console.log('Não foi possivel atualizar os dados');
    return false;
  }
};

export const deleteAd = async (adId: string): Promise<boolean> => {
  try {
    const queryUpdate = `DELETE FROM ad WHERE id = ${adId};`;

    await Pool.query(queryUpdate);
    return true;
  } catch (error) {
    console.log('Não foi possivel atualizar os dados');
    return false;
  }
};

export const getAd = async (): Promise<any | boolean> => {
  try {
    const querygetAd = `SELECT * FROM ad`;
    return await Pool.query(querygetAd);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const validationAd = async (
  userId: string,
  adValues: ISendAd,
): Promise<any | false> => {
  try {
    const { rows } = await Pool.query(
      `SELECT * FROM ad WHERE id = '${adValues.ad_id}'`,
    );

    if (rows.length == 0) return 'Falha ao consultar anúncio';

    const adValidate = rows[0];

    if (adValues.minimum < adValidate.minimum)
      return {
        validation: false,
        erro: 'Peso/quantidade inserido é menor do que o esperado ',
      };

    if (adValues.isrecyclable) {
      if (
        adValidate.quantity - adValidate.current_quantity <
        parseFloat(adValues.weight[0])
      )
        return { validation: false, erro: 'Quantidade informada é inválida' };

      if (adValidate.type == 'DOAÇÃO' && parseFloat(adValidate.price) > 0)
        return { validation: false, erro: 'Doação não deve conter preço' };

      try {
        const newValue = adValues.weight[0] + adValidate.current_quantity;
        const queryUpdate = `UPDATE ad SET current_quantity = '${newValue}' WHERE id = ${adValues.ad_id};`;
        await Pool.query(queryUpdate);
      } catch (error) {
        return {
          validation: false,
          erro: 'Ops, algo deu errado na transação! Tente novamente.',
        };
      }
    } else {
      if (adValidate.quantity - adValidate.current_quantity < adValues.amount)
        return { validation: false, erro: 'Quantidade informada é inválida' };

      if (adValidate.type == 'DOAÇÃO' && parseFloat(adValidate.price) > 0)
        return { validation: false, erro: 'Doação não deve conter preço' };

      try {
        const newValue = adValues.amount + adValidate.current_quantity;
        const queryUpdate = `UPDATE ad SET current_quantity = '${newValue}' WHERE id = ${adValues.ad_id};`;
        await Pool.query(queryUpdate);
      } catch (error) {
        return {
          validation: false,
          erro: 'Ops, algo deu errado na transação! Tente novamente.',
        };
      }
    }

    return { citizen: userId, schedule: rows, validation: true };
  } catch (error) {
    console.log('Não foi possivel validar os dados');
    return false;
  }
};

export const returnAdWeigth = async (adValues: ISendAd): Promise<any | false> => {
  try {
    const { rows } = await Pool.query(
      `SELECT * FROM ad WHERE id = '${adValues.ad_id}'`,
    );

    const adValidate = rows[0];

    let newValue = 0;
    if (adValues.isrecyclable)
      newValue = adValidate.current_quantity - parseFloat(adValues.weight[0]);
    else newValue = adValidate.current_quantity - adValues.amount;

    const queryUpdate = `UPDATE ad SET current_quantity = '${newValue}' WHERE id = ${adValues.ad_id};`;
    await Pool.query(queryUpdate);
  } catch (error) {
    console.log('Não foi possivel validar os dados');
    return false;
  }
};
