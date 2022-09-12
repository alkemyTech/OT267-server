# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```


## Datos de usuarios de prueba

<h4>Los usuarios del 1 al 10 son admins y los del 10 al 20 son regulares</h4>

- El "name" va a ser "Usuario" y el `numero` que elijan (del 1 al 20)
- El "lastname" va a ser "Demo" y el `mismo numero del usuario`
- El email utiliza la misma logica test`Numero`@test.com
- El password seria user `Numero` y `000` Ejemplo para el numero 15 ==> 15000

