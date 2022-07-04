-- CREATE TABLE USERS v1
CREATE TABLE collect_point (
  id SERIAL,
  social_reason VARCHAR(200) NOT NULL UNIQUE,
  cnpj VARCHAR(19) UNIQUE NOT NULL,
  phone VARCHAR(11) NOT NULL,
  biography VARCHAR(400) NOT NULL,
  hours_of_operation VARCHAR(50) NOT NULL,
  days_of_operation VARCHAR(50) NOT NULL,
  operating_status VARCHAR(50) DEFAULT 'ATIVO',
  -- reason_for_change VARCHAR(50) NOT NULL,
  -- data_time_for_change TIMESTAMP,
  validation_Status VARCHAR(50) DEFAULT 'PENDENTE',
  delivery_type VARCHAR [] NOT NULL,
  city VARCHAR(100) NOT NULL,
  uf VARCHAR(2) NOT NULL,
  number INTEGER NOT NULL,
  zipcode VARCHAR(8) NOT NULL,
  district VARCHAR(50) NOT NULL,
  street VARCHAR(70) NOT NULL,
  types_of_materials_accepted VARCHAR [] NOT NULL,
  user_id_fk INTEGER UNIQUE,
  PRIMARY KEY (id),
  FOREIGN KEY(user_id_fk) REFERENCES users(id)
);
--INSERT INTO collect_point(cnpj, phone, biography, hours_of_operation, operating_status, validation_status, city, uf, number, zipcode, district, street, user_id_fk)
--VALUES('12328515665', '998549459', 'teste', '08:00 - 18:00', 'ATIVO', 'APROVADO', 'são gonçalo do sapucaí', 'mg', 166, '37490000', 'centro', 'Rua genoveva neves da silva', 2)
