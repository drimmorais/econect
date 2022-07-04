-- View: public.vw_collect_point
-- DROP VIEW public.vw_collect_point;
CREATE OR REPLACE VIEW public.vw_collect_point AS
SELECT u.id,
  u.email,
  u.name,
  u.username,
  u.image,
  c.cnpj,
  c.phone,
  c.biography,
  c.zipcode,
  c.hours_of_operation,
  c.district,
  c.street,
  c.number,
  c.uf,
  c.city,
  c.delivery_type,
  c.social_reason,
  c.types_of_materials_accepted,
  c.days_of_operation
FROM users u
  JOIN collect_point c ON u.id = c.user_id_fk;
ALTER TABLE public.vw_collect_point OWNER TO postgres;
