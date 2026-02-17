import jwt from 'jsonwebtoken'

export const generateVerificationToken = (uid) => {
    return jwt.sign({
        uid
    },
        process.env.JWT_SECRET, {
        expiresIn: '12h'
    })
}