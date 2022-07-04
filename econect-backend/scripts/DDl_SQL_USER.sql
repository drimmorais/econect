-- CREATE TABLE USER v1
CREATE TABLE user (
  id SERIAL,
  email VARCHAR(150) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(80) NOT NULL,
  password VARCHAR(250) NOT NULL,
  typeuser VARCHAR(50) NOT NULL CHECK (
    typeuser = 'citizen'
    or typeuser = 'collect point'
    or typeuser = 'admin'
  ),
  image bytea,
  creationDate TIMESTAMP NOT NULL,
  passwordResetToken VARCHAR(70) DEFAULT '1',
  --status BOOLEAN,
  PRIMARY KEY (id)
);
-- --INSERT VALUES IN TABLE
-- INSERT INTO user (
--     email,
--     username,
--     name,
--     password,
--     typeuser,
--     creationdate
--   )
-- VALUES (
--     'te2ste@gmail.com',
--     'Teste2ID',
--     'te2ste',
--     '123456',
--     'collect point',
--     now()
--   )
-- RETURNING id;
