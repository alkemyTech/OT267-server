const jwt = require("jsonwebtoken"); 

const generateJWT = ( uid, name, role, email ) => {
    return new Promise((resolve, reject ) => {
        const payload = { uid, name, role, email };

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '72h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'Err: No se pudo generar el token' );
            }
            
            resolve( token ); 
        })
    })
}

module.exports = {
    generateJWT
}