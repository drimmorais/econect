CREATE TABLE public.pending_collect
(
    id SERIAL,
	operation_id integer NOT NULL,
	operation character varying(8) NOT NULL check (operation in('SCHEDULE', 'AD')),
    citizen_id integer NOT NULL,
    collect_point_id integer NOT NULL,
    status character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT pending_collect_citizen_id_fkey FOREIGN KEY (citizen_id)
        REFERENCES public.citizen (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pending_collect_collect_point_id_fkey FOREIGN KEY (collect_point_id)
        REFERENCES public.collect_point (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.pending_collect
    OWNER to postgres;

