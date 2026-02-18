import Router from 'express';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { 
    createComment, 
    getYourComments, 
    updateComment,
    deleteComment 
} from './comentarios.controller.js';

const router = new Router;

router.post(
    '/create/:publicationId',
    validateJWT,
    createComment
)

router.get(
    '/listar',
    validateJWT,
    getYourComments
)

router.put(
    '/update/:id',
    validateJWT,
    updateComment
)

router.delete(
    '/delete/:id',
    validateJWT,
    deleteComment
)

export default router;