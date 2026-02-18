import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';

const BASE_PATH = '/gestorOpiniones/v1';

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trus proxy', 1);

    try {
        await dbConnection();

        app.listen(PORT, () => {
            console.log(`GestorOpiniones Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`);
        });

    } catch (error) {
        console.error(`Error starting Admin Server: ${error.message}`);
        process.exit(1);
    }
}