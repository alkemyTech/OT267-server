/* const createError = require('http-errors'); */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerSpec = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'ONG SOMOS MAS API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    `${path.join(__dirname, './routes/*js')}`,
  ],
};

// initialization
const app = express();

// Routers imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const rolesRouter = require('./routes/roles');
const activitiesRouter = require('./routes/activities');
const organizationsRouter = require('./routes/organizations');
const testimoniesRouter = require('./routes/testimonies');
const newsRouter = require('./routes/news');
const categoriesRouter = require('./routes/categories');
const membersRouter = require('./routes/members');
const slidesRouter = require('./routes/slides');
const contactsRouter = require('./routes/contacts');
const commentsRouter = require('./routes/comments');
const donationsRouter = require('./routes/donations');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/activities', activitiesRouter);
app.use('/roles', rolesRouter);
app.use('/organization', organizationsRouter);
app.use('/testimonies', testimoniesRouter);
app.use('/news', newsRouter);
app.use('/categories', categoriesRouter);
app.use('/members', membersRouter);
app.use('/slides', slidesRouter);
app.use('/contacts', contactsRouter);
app.use('/comments', commentsRouter);
app.use('/donations', donationsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(res.status(404).send('Cannot complete the request'));
});

// error handler
/* app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

module.exports = app;
