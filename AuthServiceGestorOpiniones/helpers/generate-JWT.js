import jwt from 'jsonwebtoken'

export const generateJWT = (uid) => {
    return jwt.sign({
        uid
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}