import { User } from '../users/user.model.js'
import { hashPassword, comparePassword } from '../../helpers/hash-password.js'
import { generateJWT } from '../../helpers/generate-JWT.js'
import { generateVerificationToken } from '../../helpers/generate-verification-token.js'
import { sendVerificationEmail } from '../../helpers/send-email.js'
import jwt from 'jsonwebtoken'

export const register = async ({ username, email, password }) => {
    const exists = await User.findOne({ 
        where: { email } 
    })

    if (exists) throw new Error('Correo ya registrado')

    const user = await User.create({
        username,
        email,
        password: await hashPassword(password),
        isActive: false
    })

    const token = generateVerificationToken(user.id)
    await sendVerificationEmail(email, token)

    return { 
        message: 'Revisa tu correo para verificar la cuenta' }
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