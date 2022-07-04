CREATE TABLE ecoblog_posts(
  id SERIAL,
  title VARCHAR(150) NOT NULL,
  author VARCHAR(60) NOT NULL CHECK (
    author = 'Fellipe Costa Fagundes'
    or author = 'Guilherme Luiz Massini'
    or author = 'Adrielle Morais Coelho'
  ),
  contents TEXT NOT NULL,
  --photoDirectory VARCHAR(200),
  creation_date TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);
