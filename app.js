require('dotenv').config();
require('./configs/passport');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session       = require('express-session');
const passport      = require('passport');
const MongoStore = require('connect-mongo');
const cors = require('cors');

mongoose
  .connect('mongodb://localhost/onboarding-backend', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));

//Session settings
const options = {
  mongoUrl: 'mongodb://localhost/onboarding-backend',
  ttl: 14*24*60*60
};
app.use(session({
  secret: process.env.API_SECRET,
  store: MongoStore.create(options),
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Setting CORS
app.use(cors({
  credentials: true,
  origin: [process.env.FE_POINT]
}));
     

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Onboarding API';


//Routes
const auth = require('./routes/auth-routes');
const user = require('./routes/user-routes');
const journey = require('./routes/journey-routes');
const journeyDetails = require('./routes/journey-details-routes');
const milestone = require('./routes/milestone-routes');
const task = require('./routes/task-routes');
const journeyProgress = require('./routes/journey-p-routes');
const journeyDetailsProgress = require('./routes/journey-details-p-routes');
const milestoneProgress = require('./routes/milestone-p-routes');
const taskProgress = require('./routes/task-p-routes');
app.use('/', auth);
app.use('/', user);
app.use('/template', journey);
app.use('/template', journeyDetails);
app.use('/template', milestone);
app.use('/template', task);
app.use('/data', journeyProgress);
app.use('/data', journeyDetailsProgress);
app.use('/data', milestoneProgress);
app.use('/data', taskProgress);

module.exports = app;
