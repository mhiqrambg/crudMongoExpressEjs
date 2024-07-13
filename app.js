const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const app = express();
app.use(methodOverride('_method'));

const routeGarments = require('./routes/garments');
const routeProducts = require('./routes/products');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set Route FrontEnd
app.get('/garments/add', (req, res) => {
  res.render('garments/create');
});

app.get(`/garments/:gar_id/products`, (req, res) => {
  res.render('products/create', { gar_id: req.params.gar_id });
});
// Set Route BackEnd
app.use(routeProducts);
app.use(routeGarments);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
