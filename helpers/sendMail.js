require("dotenv").config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (email, subject = null, text = null, html=null) => {
    if (!email) throw 'El email es requerido.'
    if (!subject) subject = 'Contacto - Somos Más-';
    if (!text) text = 'Hemos recibido su consulta. Muchas gracias.';
    if (!html) html=`<div>${text}</div>`;
    const msg = {
        to: email,
        from: process.env.EMAIL_SOMOSMAS,
        subject: subject,
        text: text,
        html: html,
    }
    try {
        await sgMail.send(msg);
        console.log('Message sent succesfully')
        return {
            status: true,
            message: 'Mail enviado existosamente'
        }
    } catch (error) {
        let message = 'Error: No se pudo enviar el mail';
        console.log(error);
        if (error.response) {
            console.error(error.response)
            message = error.response;
        }
        return {
            status: false,
            message
        }
    }
}



module.exports = {
    sendMail
}