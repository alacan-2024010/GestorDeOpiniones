import Router from 'express';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import {
    createPublication,
    getPublications,
    getPublicationById,
    updatePublication,
    deletePublication
} from './publicaciones.controller.js';

const router = new Router;

router.post(
    '/create',
    validateJWT,
    createPublication
)

router.get(
    '/listar',
    getPublications
)

router.get(
    '/listar/:id',
    validateJWT,
    getPublicationById
)

router.put(
    '/update/:id',
    validateJWT,
    updatePublication
)

router.delete(
    '/delete/:id',
    validateJWT,
    deletePublication
)