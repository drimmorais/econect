CREATE TABLE validations_new_status_operation (
  id SERIAL,
  social_reason VARCHAR(200) NOT NULL UNIQUE,
  cnpj VARCHAR(19) NOT NULL,
  new_status VARCHAR (50) NOT NULL,
  comment VARCHAR (500) NOT NULL,
  validation_type VARCHAR(50) NOT NULL CHECK (validation_type = 'mudança_de_status'),
  validation_status VARCHAR(50) DEFAULT 'PENDENTE',
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
