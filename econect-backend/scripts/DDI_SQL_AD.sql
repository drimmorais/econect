-- CREATE TABLE AD v1
CREATE TABLE ad(
  id SERIAL,
  status_of_sale BOOLEAN DEFAULT false,
  completion_status VARCHAR(50) DEFAULT 'ATIVO',
  quantity FLOAT,
  isrecyclable BOOLEAN DEFAULT true,
  current_quantity FLOAT DEFAULT 0,
  price MONEY,
  type VARCHAR(50),
  closing_date TIMESTAMP,
  content VARCHAR(150),
  title VARCHAR(50),
  minimum FLOAT NOT NULL,
  collect_point_id INTEGER NOT NULL,
  type_material_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY(collect_point_id) REFERENCES collect_point(id),
  FOREIGN KEY(type_material_id) REFERENCES type_material(id)
);
-- INSERT INTO public.ad(
-- 	status_of_sale, completion_status, quantity, current_quantity, price, type, closing_date, content, title, collect_point_id, type_material_id)
-- 	VALUES (false, 'ATIVO', 20000, 20, 0, 'DOAÇÃO', '08-05-2022', 'garrafa pet', 'aceita-se garrafa pet', 1, 1);
