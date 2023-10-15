# Node.js RESTful API Server Template

Kick-start your RESTful API project with this comprehensive Node.js, Express, and Mongoose boilerplate. Set up a production-ready, scalable Node.js application in just one command.

This template is meticulously designed to incorporate best development practices and a wide array of features:

- **JWT Authentication**: Secure your application endpoints using industry-standard JSON Web Token (JWT) authentication.
- **Request Validation**: Benefit from robust request validation mechanisms to ensure data quality and consistency.
- **Unit & Integration Testing**: Harness the power of both unit and integration testing to maintain a solid codebase.
- **Docker Support**: Easily containerize your application for consistent development and deployment.
- **API Documentation**: Integrated API documentation tools provide clarity and ease of use for developers.
- **Pagination & Database Plugins**: Efficiently manage large datasets with built-in pagination and custom Mongoose plugins.
- **Continuous Integration**: Automated workflows that bolster code quality and streamline the development process.
- **Logging & Monitoring**: Gain insights into your application's behavior and performance.
- **And much more**: Dive into the documentation below to explore all the capabilities of this template.

## Manual Setup

Clone the repo:

```bash
git clone https://github.com/ernest0galdamez/node-express-boilerplate.git
cd node-express-boilerplate
# Optional: If you want to remove the existing Git repository and history to start fresh, you can use the following command.
# This step is typically done when starting a new project or sharing the code publicly to remove Git-related information.
npx rimraf ./.git
```

Install Necessary Packages:

```bash
npm install
```

Set the environment settings:

```bash

# Edit .env to adjust any environment variables as necessary
cp .env.example .env

```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Configuration Variables](#environment-configuration-variables)
- [Directory Layout](#directory-layout)
- [API Documentation and Endpoints](#api-documentation-and-endpoints)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [System Status Verification](#system-status-verification)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
- [Code Quality Assurance](#code-quality-assurance)
- [How to Contribute](#how-to-contribute)

## Features

### Core Capabilities:

- **Database Management**: Utilize [MongoDB](https://www.mongodb.com) NoSQL, supported by [Mongoose](https://mongoosejs.com) for object data modeling.
- **User Management**: Implement [passport](http://www.passportjs.org) for authentication and authorization.
- **API Handling**: Ensure request data validation using [Joi](https://github.com/hapijs/joi) and enable Cross-Origin Resource-Sharing with [cors](https://github.com/expressjs/cors).
- **Documentation**: Produce API documentation using [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) complemented by [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express).

### Quality and Performance:

- **Testing**: Write unit and integration tests using [Jest](https://jestjs.io).
- **Monitoring**: Monitor service health and database connectivity, and employ [winston](https://github.com/winstonjs/winston) along with [morgan](https://github.com/expressjs/morgan) for comprehensive logging.
- **Optimization**: Use [compression](https://github.com/expressjs/compression) for gzip compression to boost performance.

### Development Environment:

- **Environment Management**: Manage dependencies with [PNPM](https://pnpm.io/) and control environment variables through [dotenv](https://github.com/motdotla/dotenv) & [cross-env](https://github.com/kentcdodds/cross-env#readme).
- **Continuous Integration**: Use [Github Actions](https://docs.github.com/en/actions) for a seamless CI process.
- **Docker**: Integrated Docker support for containerized deployment.
- **Code Quality**: Ensure consistent code style and linting with [ESLint](https://eslint.org) and [Prettier](https://prettier.io).

### Security and Protection:

- **Security Measures**: Apply [helmet](https://helmetjs.github.io) to set critical security HTTP headers and sanitize request data against potential threats like xss and query injection.
- **Update Management**: Keep dependencies up-to-date using [Dependabot](https://docs.github.com/pt/code-security/dependabot).
- **Coverage**: Monitor code coverage metrics via [coveralls](https://coveralls.io).

## Commands

### Local Development:

For local development, the following command will spin up the server with hot-reloading:

```bash
npm run dev
```

This ensures real-time reflection of code changes, enhancing the development experience.

### Production:

When deploying your application to production:

```bash
node src/index.js
```

### Testing:

Test the integrity of your application using these commands:

```bash
# Run all tests
npm run test

# Run all tests in watch mode for real-time feedback
npm run test:watch

# Generate a test coverage report
npm run coverage
```

### Docker:

Leverage Docker for containerization with these commands:

```bash
# Deploy the docker container in production mode
npm run docker:prod

# Run all tests inside a Docker container
npm run docker:test
```

### Code Quality (Linting & Formatting):

Maintain high code quality and consistent styling:

```bash
# Check code using ESLint
npm run lint

# Automatically fix ESLint errors
npm run lint:fix

# Format code using Prettier
npm run prettier

# Automatically fix formatting errors with Prettier
npm run prettier:fix
```

## Environment Configuration Variables

The application uses environment variables to customize its behavior for different scenarios. You can locate and alter these variables in the `.env` file. The default configuration is as follows:

```bash
# Application Settings
# Port number for the application
PORT=3000
# Log level for the application
LOG_LEVEL=info
# Node.js environment configuration (e.g., development, production)
NODE_ENV=production

# Database Settings
# URL of the MongoDB database
MONGODB_URL=mongodb://127.0.0.1:27017/node-express-boilerplate

# JWT (JSON Web Token) Configuration
# JWT secret key for token signing and validation
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30
# Number of minutes after which a reset password token expires
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
# Number of minutes after which a verify email token expires
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

# SMTP (Simple Mail Transfer Protocol) Configuration
# For testing, you can use a fake SMTP service like Mailtrap, Ethereal, or any other
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@nodeboilerplate.com
```

## Directory Layout

Below is the project's directory structure:

```
src\
 |— config\          # Configuration settings and environment variables
 |— controllers\     # Route controllers (handle incoming requests)
 |— docs\            # Swagger API documentation assets
 |— middlewares\     # Custom middlewares for Express
 |— models\          # Data models using Mongoose
 |— routes\          # All route definitions
 |— services\        # Business logic or interactions with databases and other services
 |— utils\           # Utility functions and helper scripts
 |— validations\     # Schemas for request data validation
 |— app.js           # Express app configuration
 |— index.js         # The main entry point for the application
```

## API Documentation and Endpoints

To access and review the list of available APIs and their details, initiate the server and navigate to `http://localhost:3000/v1/docs`. This documentation is dynamically generated utilizing [swagger](https://swagger.io/) annotations present in the route files.

### Available Endpoints

Here's an overview of the provided routes:

**Health Check**:\
`GET /health` - Fetch app's health status.

**Authentication**:\
`POST /v1/auth/register` - Register a new user.\
`POST /v1/auth/login` - Authenticate and login.\
`POST /v1/auth/refresh-tokens` - Update authentication tokens.\
`POST /v1/auth/forgot-password` - Initiate reset password process via email.\
`POST /v1/auth/reset-password` - Reset the user password.\
`POST /v1/auth/send-verification-email` - Send email for user verification.\
`POST /v1/auth/verify-email` - Confirm the email verification.

**User Operations**:\
`POST /v1/users` - Create a new user.\
`GET /v1/users` - Retrieve a list of users.\
`GET /v1/users/:userId` - Get a specific user's details.\
`PATCH /v1/users/:userId` - Modify a user's information.\
`DELETE /v1/users/:userId` - Erase a user.

## Error Handling

This application utilizes a centralized approach for error handling.

To handle errors, controllers should attempt to capture and relay them to the error-handling middleware (via `next(error)`). There's also a convenience method: wrap the controller in the catchAsync utility which automatically forwards any errors.

```javascript
const catchAsync = require('../utils/catchAsync');

const myController = catchAsync(async (req, res) => {
  throw new Error('An unexpected error occurred.');
});
```

Error responses follow this structure:

```json
{
  "code": 404,
  "message": "Resource not found."
}
```

In a development setting, error responses also include the error's stack trace.

A specialized ApiError class is available for structured error responses. You can specify both a response code and a message and then throw the error (which catchAsync will intercept). For instance, when attempting to retrieve a nonexistent user from the database, the code might look like:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
```

## Validation

All request data goes through validation using the [Joi](https://joi.dev/) library. You can delve deeper into constructing Joi validation schemas by referring to their [official documentation](https://joi.dev/api/).

All validation schemas reside in the `src/validations` directory. When setting up routes, these schemas integrate with the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', validate(userValidation.createUser), userController.createUser);
```

## Authentication

For routes that demand authentication, incorporate the auth middleware.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, the system responds with an Unauthorized (401) error.

**Generating Tokens**:

By successfully executing the register (`POST /v1/auth/register`) or sign-in (`POST /v1/auth/login`) API calls, you can procure an access token. These endpoint responses also provide refresh tokens.

Each access token remains valid for half an hour. You have the flexibility to adjust this duration by altering the `JWT_ACCESS_EXPIRATION_MINUTES` value in the .env file.

**Refreshing Access Tokens**:

Once the access token reaches its expiration, you can obtain a new one. This can be done by sending a request to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and including a valid refresh token in the request. This will provide you with both a new access and refresh token.

Refresh tokens come with a default validity of 30 days. Adjusting the `JWT_REFRESH_EXPIRATION_DAYS` in the .env file lets you modify this duration.

## Authorization

The `auth` middleware offers a mechanism to demand specific privileges or permissions for certain endpoints.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth('manageUsers'), userController.createUser);
```

In this example, only authenticated users with the `manageUsers` privilege can access this route.

Roles are used to determine permissions. Each role's permissions can be viewed in the `src/config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<src path>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

During development, all log messages, irrespective of severity, will appear in the console.

For the production environment, only the info, warn, and error messages will be shown in the console.
The server or its managing process should capture these messages and archive them into log files.
This application uses pm2 when in production, which is set up to save logs into dedicated files.

Note: All API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## System Status Verification

The application includes a feature to assess its operational status.

```javascript
const healthcheck = catchAsync(async (_req, res) => {
  const isDbHealthy = await healthcheckService.checkConnection();
  if (!isDbHealthy) {
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'DB unavailabe');
  }

  const body = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  res.status(httpStatus.OK).send(body);
});
```

If there's a disruption in the database connection, the system will return a 'Service Unavailable (503)' error.

The functionality of the `checkConnection` function creates/updates a document at `healthchecks` collection to confirm the system's integrity.

## Custom Mongoose Plugins

This application has integrated two bespoke mongoose plugins, enhancing its capabilities. These plugins can be associated with any mongoose schema as required. To locate these plugins, navigate to `src/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true },
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);
```

### toJSON

The toJSON makes the following modifications when invoking the toJSON transformation:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

### paginate

The paginate plugin adds the `paginate` static method to the mongoose schema.

Adding this plugin to the `User` model schema will allow you to do the following:

```javascript
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};
```

The `filter` param is a regular mongo filter.

The `options` param can have the following (optional) fields:

```javascript
const options = {
  sortBy: 'name:desc', // sort order
  limit: 5, // maximum results per page
  page: 2, // page number
};
```

The plugin also supports sorting by multiple criteria (separated by a comma): `sortBy: name:desc,role:asc`

The `paginate` method returns a Promise, which fulfills with an object having the following properties:

```json
{
  "results": [],
  "page": 2,
  "limit": 5,
  "totalPages": 10,
  "totalResults": 48
}
```

## Code Quality Assurance

For maintaining code consistency, we utilize [ESLint](https://eslint.org/) combined with [Prettier](https://prettier.io).

Within this application, our ESLint setup adheres to the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base), with slight adjustments. Additionally, it incorporates [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to disable any rules that may overlap or conflict Prettier.

Adjustments to ESLint can be made via the `.eslintrc.json` file. For alterations to Prettier settings, consult the `.prettierrc.json` file.

To exclude specific files or directories from the linting process, list them in `.eslintignore` and `.prettierignore`.

## How to Contribute

Your contributions are greatly appreciated! For guidelines on how to contribute, refer to the [contribution guide](CONTRIBUTING.md).

## Licensing

Covered under the [MIT](LICENSE) license.
