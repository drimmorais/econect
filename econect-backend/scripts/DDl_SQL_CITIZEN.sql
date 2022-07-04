-- CREATE TABLE USERS v1
CREATE TABLE citizen (
  id SERIAL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  phone VARCHAR(11) NOT NULL,
  biography VARCHAR(400) NOT NULL,
  -- exchangedEcopoints VARCHAR(100), -- Vamos precisar adicionar mais para frente
  -- exchangedMade VARCHAR(50), --Vamos precisar adicionar mais para frente
  city VARCHAR(100) NOT NULL,
  uf VARCHAR(2) NOT NULL,
  number INTEGER NOT NULL,
  zipcode VARCHAR(8) NOT NULL,
  district VARCHAR(50) NOT NULL,
  --BAIRRO
  street VARCHAR(70) NOT NULL,
  --RUA
  user_id_fk INTEGER UNIQUE,
  PRIMARY KEY (id),
  FOREIGN KEY(user_id_fk) REFERENCES users(id)
);
--INSERT INTO citizen(cpf, phone, biography, city, uf, number, zipcode, district, street, user_id_fk)
--VALUES('12328515665', '998549459', 'teste', 'são gonçalo do sapucaí', 'mg', 166, '37490000', 'centro', 'Rua genoveva neves da silva', 2)
