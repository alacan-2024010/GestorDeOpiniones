'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './db.js';

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;

    try {
        await dbConnection();

        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`GestorOpinions Auth Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`);
        });
    } catch (err) {
        console.error(`Error starting Auth Server: ${err.message}`);
        process.exit(1);
    }
};