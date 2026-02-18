import nodemailer from 'nodemailer'

export const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const frontendUrl = 'http://localhost:3006';
    const verificationUrl  = `${frontendUrl}/verify-email?token=${token}`;

    await transporter.sendMail({
        to: email,
        subject: 'Verifica tu cuenta',
        html: `
            <h2>Verifica tu cuenta</h2>
            <p>Haz click en el siguiente enlace para activar tu cuenta:</p>
            <br><br>
            <a href="${verificationUrl}">${verificationUrl}</a>
            `
    })
}