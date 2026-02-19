import {Router} from 'express';
import { register, login, verify , changePassword} from './auth.controller.js'
import { validateJWT } from '../../middlewares/validate-jwt.js'
import { uploadUserImage } from '../../middlewares/file-uploader.js';
import { cleanUploaderFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router()

router.post(
    '/register', 
    uploadUserImage.single('photo'),
    cleanUploaderFileOnFinish,
    register
)
router.post(
    '/login', 
    login
)
router.get(
    '/verify/:token', 
    verify
)

router.get(
    '/profile', 
    validateJWT, 
    (req, res) => {
        res.json(req.user)
    }
)

router.put(
    '/changePassword',
    validateJWT,
    changePassword
);

export default router;