const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('express-compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const healthcheck = require('./routes/healthcheck.route');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

// Enable logging middleware based on the environment
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data to prevent MongoDB injection
app.use(mongoSanitize());

// Enable gzip compression for responses
app.use(compression());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.options('*', cors());

// Initialize Passport for JWT authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Rate limit repeated failed requests to auth endpoints in production
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// Healthcheck API route
app.use('/health', healthcheck);

// Version 1 API routes
app.use('/v1', routes);

// Send a 404 error for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert errors to ApiError, if needed
app.use(errorConverter);

// Handle errors with a custom error handler
app.use(errorHandler);

module.exports = app;
