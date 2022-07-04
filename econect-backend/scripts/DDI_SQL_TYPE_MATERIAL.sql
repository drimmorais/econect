CREATE TABLE type_material(
  id Integer,
  description VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  identification VARCHAR(70) NOT NULL,
  --subcategory VARCHAR(50) NOT NULL,
  points_generated FLOAT NOT NULL,
  note VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(id, key_aux)
);
------------------------INSERÇÃO DE MATERIAIS DO TIPO METAL----------------------------
INSERT INTO type_material(
    id,
    description,
    category,
    key_aux,
    points_generated,
    note
  )
VALUES (
    1,
    'Tampa de Garrafa',
    'metal',
    'TampaDeGarrafa',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    2,
    'Latas',
    'metal',
    'Latas',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    3,
    'Panelas sem cabo',
    'metal',
    'PanelasSemCabo',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    4,
    'Ferragens',
    'metal',
    'Ferragens',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    5,
    'Arames',
    'metal',
    'Arames',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    6,
    'Chapas de aço e alumínio',
    'metal',
    'ChapasDeAçoEAlumínio',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    7,
    'Canos',
    'metal',
    'Canos',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    8,
    'Pregos',
    'metal',
    'Pregos',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    9,
    'Cobre',
    'metal',
    'Cobre',
    10,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ) -----------------------------------------####--------------------------------------------
  ------------------------INSERÇÃO DE MATERIAIS DO TIPO PAPEL----------------------------
INSERT INTO type_material(
    id,
    description,
    category,
    key_aux,
    points_generated,
    note
  )
VALUES (
    10,
    'Jornais e Revistas',
    'papel',
    'JornaisERevistas',
    8,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    11,
    'Listas Telefonicas',
    'papel',
    'ListasTelefonicas',
    8,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    12,
    'Papel',
    'papel',
    'Papel',
    8,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    13,
    'Caixas',
    'papel',
    'Caixas',
    8,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    14,
    'Embalagem longa vida',
    'papel',
    'EmbalagemLongaVida',
    8,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    15,
    'Envelope',
    'papel',
    'Envelope',
    8,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    16,
    'Rascunhos',
    'papel',
    'Rascunhos',
    8,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  );
-----------------------------------------####--------------------------------------------
------------------------INSERÇÃO DE MATERIAIS DO TIPO PLÁSTICO----------------------------
INSERT INTO type_material(
    id,
    description,
    category,
    key_aux,
    points_generated,
    note
  )
VALUES (
    17,
    'Copos',
    'plastico',
    'CoposPlastico',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    18,
    'Garrafas',
    'plastico',
    'GarrafasPlastico',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    19,
    'Sacos e Sacolas',
    'plastico',
    'SacosESacolas',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    20,
    'Frascos de Produtos',
    'plastico',
    'FrascosDeProdutos',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    21,
    'Tampas',
    'plastico',
    'Tampas',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    22,
    'Potes',
    'plastico',
    'Potes',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    23,
    'Canos e Tubos de PVC',
    'plastico',
    'CanosETubosDePVC',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    24,
    'PET',
    'plastico',
    'PET',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    25,
    'Embalagem de alimentos',
    'plastico',
    'EmbalagemDeAlimentos',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  );
-----------------------------------------####--------------------------------------------
------------------------INSERÇÃO DE MATERIAIS DO TIPO VIDRO----------------------------
INSERT INTO type_material(
    id,
    description,
    category,
    key_aux,
    points_generated,
    note
  )
VALUES (
    26,
    'Garrafas',
    'vidro',
    'GarrafasVidro',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    27,
    'Potes',
    'vidro',
    'PotesVidro',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    28,
    'Frascos de remedio',
    'vidro',
    'FrascosDeRemedio',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    29,
    'Copos',
    'vidro',
    'CoposVidro',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    30,
    'Cacos',
    'vidro',
    'Cacos',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    31,
    'Para brisas',
    'vidro',
    'ParaBrisas',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  ),
  (
    32,
    'Frascos de produtos',
    'vidro',
    'FrascosDeProdutosVidro',
    5,
    'MATERIAL PARA RECICLAGEM SEM RESTRIÇÕES'
  );
-----------------------------------------####--------------------------------------------
