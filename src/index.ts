import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import dotenv from 'dotenv'
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
dotenv.config();
const app = express();


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Training',
            version: '1.0.0',
            description: 'API documentation for Node Training project',
            contact: {
                name: 'Sujeet Yadav',
                email: 'your-email@example.com',
            },
        },
        servers: [
            {
              url: 'http://localhost:8080', // Your server URL
            },
        ],

    },
    apis: ['./src/router/*.ts'], // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(options);

// Serve swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())

const server = http.createServer(app);
server.listen(8080, () => {
    console.log('Server running on Port 8080')
});
