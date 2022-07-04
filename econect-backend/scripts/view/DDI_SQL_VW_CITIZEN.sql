CREATE OR REPLACE VIEW public.vw_citizen
 AS
 SELECT
 	  u.id,
    u.image,
    u.email,
    u.name,
    u.username,
    c.cpf,
    c.phone,
    c.biography,
    c.zipcode,
    c.district,
    c.street,
    c.number,
    c.uf,
    c.city
   FROM users u
     JOIN citizen c ON u.id = c.user_id_fk;

ALTER TABLE public.vw_citizen
    OWNER TO postgres;



