CREATE TABLE schedule_collect(
  id SERIAL,
  weight VARCHAR [] NOT NULL,
  point_accumulated VARCHAR(50) NOT NULL,
  note VARCHAR(150),
  schedule_date VARCHAR(150) NOT NULL,
  schedule_hours VARCHAR(150) NOT NULL,
  delivery_type VARCHAR(55) NOT NULL check (delivery_type in('HOME', 'COMPANY')),
  price double precision NOT NULL,
  isRecyclable Boolean NOT NULL DEFAULT true,
  amount double precision DEFAULT 0,
  collect_point_id INTEGER,
  type_material_id INTEGER [],
  PRIMARY KEY (id),
  FOREIGN KEY (collect_point_id) REFERENCES collect_point(id)
)
