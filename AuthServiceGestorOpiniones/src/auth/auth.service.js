import { User } from '../users/user.model.js'
import { hashPassword, comparePassword } from '../../helpers/hash-password.js'
import { generateJWT } from '../../helpers/generate-JWT.js'
import { generateVerificationToken } from '../../helpers/generate-verification-token.js'
import { sendVerificationEmail } from '../../helpers/send-email.js'
import jwt from 'jsonwebtoken'

export const register = async ({ username, email, password, photo }) => {
    const exists = await User.findOne({
        where: { email }
    })
    if (exists) throw new Error('Correo ya registrado')

    const usernameExists = await User.findOne({
        where: {username}
    })

    if (usernameExists) throw new Error('username ya registrado')
    
    if (password.length < 8) {
        throw new Error('La contraseña debe tener mínimo 8 caracteres')
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        photo,
        isActive: false
    })

    const token = generateVerificationToken(user.id)
    await sendVerificationEmail(email, token)

    return {
        message: 'Revisa tu correo para verificar la cuenta'
    }
}

export const verify = async (token) => {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(uid)

    user.isActive = true
    await user.save()

    return { message: 'Cuenta verificada' }
}

export const login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } })

    if (!user || !user.isActive) {
        throw new Error('Credenciales inválidas')
    }

    const valid = await comparePassword(password, user.password)
    if (!valid) throw new Error('Credenciales inválidas')

    return {
        token: generateJWT(user.id),
        user
    }
}

export const changePassword = async (userId, oldPassword, newPassword) => {

    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('ID de usuario no encontrado');
    }

    const validPassword = await comparePassword(oldPassword, user.password);

    if (!validPassword) {
        throw new Error('La contraseña actual es incorrecta');
    }

    if (newPassword.length < 8) {
        throw new Error('La nueva contraseña debe tener mínimo 8 caracteres');
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return {
        message: 'Contraseña actualizada correctamente'
    }
}

export const changeUsername = async(userId, newUsername)=>{
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('ID de usuario no encontrado');
    }

    if (!newUsername || newUsername.trim() === '') {
        throw new Error('El username no puede estar vacío');
    }

    //para verificar si el nuevo username ya existe
    const usernameExists = await User.findOne({
        where:{username: newUsername}
    })

    if (usernameExists && usernameExists.id !== userId) {
        throw new Error('El username ya está en uso');
    }

    user.username = newUsername;
    await user.save();

    return {
        message: 'Username actualizado correctamente',
        user
    };
}

export const changePhoto = async(userId, newPhoto)=>{
    const user = await User.findByPk(userId);

    if (!user) {
        throw new Error('ID de usuario no encontrado');
    }

    if(!newPhoto){
        throw new Error('Debes enviar una imagen para tu perfil')
    }

    user.photo = newPhoto;
    await user.save();

    return{
        message: 'Imagen de perfil actualizada correctamente',
        user
    }
}