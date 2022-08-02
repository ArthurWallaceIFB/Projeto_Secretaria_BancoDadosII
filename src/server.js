require('dotenv').config({path:'dev.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');

const routes = require('./routes');

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api', routes);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`-- Servidor rodando em http://localhost:${port}`);
    console.log(`-- [DOC] Documentação rodando em http://localhost:${port}/api-docs`);
});

