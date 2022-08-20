require("dotenv").config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (email, subject = null, text = null) => {
    if (!email) throw 'El email es requerido.'
    if (!subject) subject = 'Contacto - Somos Más-';
    if (!text) text = 'Hemos recibido su consulta';
    const msg = {
        to: email,
        from: process.env.EMAIL_SOMOSMAS,
        subject: subject,
        text: text
    }
    try {
        await sgMail.send(msg);
        console.log('Message sent succesfully')
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.error(error.response)
        }
    }
}

// sendMail('msmarinip@gmail.com');