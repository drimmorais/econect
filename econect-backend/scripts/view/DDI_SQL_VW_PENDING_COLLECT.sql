-- View: public.vw_pending_collect
-- DROP VIEW public.vw_pending_collect;
CREATE OR REPLACE VIEW public.vw_pending_collect AS
SELECT pc.id,
  pc.collect_point_id,
  pc.citizen_id,
  pc.status,
  pc.operation_id,
  u.name AS citizen_name,
  c.cpf AS citizen_cpf,
  c.phone AS citizen_phone,
  (
    (
      (
        (
          (
            (
              (
                ((c.street::text || ' - '::text) || c.number) || ' - '::text
              ) || upper(c.district::text)
            ) || ' - '::text
          ) || c.city::text
        ) || ' - '::text
      ) || upper(c.uf::text)
    ) || ' - '::text
  ) || c.zipcode::text AS citizen_address,
  cp.cnpj AS collect_poin_cpf,
  cp.phone AS collect_poin_phone,
  (
    (
      (
        (
          (
            (
              (
                ((cp.street::text || ' - '::text) || cp.number) || ' - '::text
              ) || upper(cp.district::text)
            ) || ' - '::text
          ) || cp.city::text
        ) || ' - '::text
      ) || upper(cp.uf::text)
    ) || ' - '::text
  ) || cp.zipcode::text AS collect_point_address,
  cp.social_reason AS collect_point_name,
  sc.schedule_date::text AS date_shedule,
  sc.schedule_hours::text AS time_shedule,
  sc.weight,
  sc.delivery_type AS delivery,
  sc.type_material_id,
  sc.point_accumulated,
  tm.description As type_material_description
FROM pending_collect pc
  JOIN citizen c ON pc.citizen_id = c.id
  JOIN collect_point cp ON pc.collect_point_id = cp.id
  JOIN users u ON c.user_id_fk = u.id
  JOIN schedule_collect sc ON pc.operation_id = sc.id
  JOIN type_material tm ON tm.id = any(sc.type_material_id::INTEGER []);
ALTER TABLE public.vw_pending_collect OWNER TO postgres;
