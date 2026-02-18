import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';
import { corsOptions } from './cors-configuration.js';
import publicationRoutes from '../src/publicaciones/publicaciones.routes.js';
import commentRoutes from '../src/comentarios/comentarios.routes.js';

const BASE_PATH = '/gestorOpiniones/v1';

const middlewares = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
}

const routes = (app) => {

    app.use(`${BASE_PATH}/publications`, publicationRoutes);
    app.use(`${BASE_PATH}/comments`, commentRoutes);
    app.get(`${BASE_PATH}/Health`, (request, response) => {
        response.status(200).json({
            status: 'Healthy',
            timestamp: new Date().toISOString(),
            service: 'GestorOpiniones Server'
        })
    })

    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Endpoint no encontrado en la API'
        })
    })
}


export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trus proxy', 1);

    try {
        await dbConnection();
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`GestorOpiniones Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`);
        });

    } catch (error) {
        console.error(`Error starting Admin Server: ${error.message}`);
        process.exit(1);
    }
}