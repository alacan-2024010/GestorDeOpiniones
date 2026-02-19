import Router from 'express';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import {
    createPublication,
    getPublications,
    getPublicationById,
    updatePublication,
    deletePublication
} from './publicaciones.controller.js';
import{uploadPublicationImage} from '../../middlewares/file-uploader.js';
import { cleanUploaderFileOnFinish } from '../../middlewares/delete-file-on-error.js';
const router = new Router;

router.post(
    '/create',
    validateJWT,
    uploadPublicationImage.single('photo'),
    cleanUploaderFileOnFinish,
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
    uploadPublicationImage.single('photo'),
    cleanUploaderFileOnFinish,
    updatePublication
)

router.delete(
    '/delete/:id',
    validateJWT,
    deletePublication
)

export default router;