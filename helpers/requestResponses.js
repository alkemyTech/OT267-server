/* 200 OK */
/*  La solicitud ha tenido éxito. */
/* El significado de un éxito varía dependiendo del método HTTP */

/* 201 Created */
/* La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello. */
/* Ésta es típicamente la respuesta enviada después de una petición PUT. */

const success = ({
  res, message, data, status = 200,
}) => {
  res.status(status).json({
    message,
    data,
  });
};
/* 400 Bad Request
    el servidor no pudo interpretar la solicitud dada una sintaxis inválida. */

/* 401 Unauthorized */
/* Es necesario autenticar para obtener la respuesta solicitada. */
/* Esta es similar a 403, pero en este caso, la autenticación es posible */

/* 403 Forbidden */
/* El cliente no posee los permisos necesarios para cierto contenido, */
/* por lo que el servidor está rechazando otorgar una respuesta apropiada */

/* 404 Not Found */
/* El servidor no pudo encontrar el contenido solicitado.  */
/* Este código de respuesta es uno de los más famosos dada su alta ocurrencia en la web. */

const error = ({ res, message, status = 404 }) => {
  res.status(status).send(message);
};

/* 500 Internal Server Error */
/* El servidor ha encontrado una situación que no sabe cómo manejarla. */
const serverError = ({ res, message, status = 500 }) => {
  res.status(status).send(message);
};

module.exports = { success, error, serverError };
