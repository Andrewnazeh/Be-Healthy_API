const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const { I18n, getLocale } = require('i18n')

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/connectionDB');
// Routes
const mountRoutes = require('./routes');

// Connect with db
dbConnection();

// express app
const app = express();


//support arabic and english language
//configration i18n
const i18n = new I18n({
  locales: ['en', "ar"],
  directory: path.join('./', 'locales'),
  defaultLocale: 'en',
  header: 'lang',
  cookie:'lang',
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false,
  syncFiles: true
});


// Initialize i18n
app.use(i18n.init, (req, res, next) => {
  const lang = req.query.lang ||req.headers.lang|| 'en';
  req.setLocale(lang);
  next();
})


// const translatedResults = catFoods.map(item => {
//     item.name = req.__(item.name); // Translate the name field
//     return item;
// });
// var language = req.getlocale();


// const socketIo = require('socket.io');
// const server = require('http').createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Emit a welcome message when a client connects
//   socket.emit('message', 'Welcome to the WebSocket server!');

//   // Handle a client message
//   socket.on('sendNotification', (data) => {
//     console.log('Notification received: ', data);
//     // Broadcast the notification to all connected clients
//     io.emit('notification', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const changeStream = collection.watch();

// // Listen for change events
// changeStream.on('change', (change) => {
//   console.log('Change detected:', change);

//   // Perform your trigger action here
//   if (change.operationType === 'insert') {
//     console.log('Document inserted:', change.fullDocument);
//     // Add your logic here for insert events
//   } else if (change.operationType === 'update') {
//     console.log('Document updated:', change.updateDescription);
//     // Add your logic here for update events
//   } else if (change.operationType === 'replace') {
//     console.log('Document replaced:', change.fullDocument);
//     // Add your logic here for replace events
//   } else if (change.operationType === 'delete') {
//     console.log('Document deleted:', change.documentKey);
//     // Add your logic here for delete events
//   }

// });

// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

// Middlewares
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Sanitize data
app.use(mongoSanitize());

// Set security HTTP headers
app.use(helmet());

app.disable('x-powered-by');

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: [
      'price',
      'sold',
      'quantity',
      'ratingsAverage',
      'ratingsQuantity',
    ],
  })
);

// Mount Routes
mountRoutes(app);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
