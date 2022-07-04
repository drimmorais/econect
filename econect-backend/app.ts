import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Pool from './psql';

dotenv.config();

import genericRoutes from './src/routes/generic';
import Swagger from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import swaggerJsDoc from 'swagger-jsdoc';

Pool.connect()
  .then(() => {
    app.emit('Connected');
  })
  .catch((e) => console.log(e));

const swaggerDocs = swaggerJsDoc(swaggerDocument);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, PATCH, DELETE, OPTIONS',
    );
    // res.setHeader('Access-Control-Allow-Credentials', true);
    return res.status(200).json({});
  }
  next();
});

app.use(genericRoutes);
app.use('/doc/apiv1', Swagger.serve, Swagger.setup(swaggerDocs));

const port = 8080;
app.on('Connected', () => {
  app.listen(process.env.PORT || port, () => {
    console.log(`Server running on :${port}`);
    console.log('Press CTRL + C to exit');
  });
});
