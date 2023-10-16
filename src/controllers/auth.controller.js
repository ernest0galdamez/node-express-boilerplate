const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/user.model');
const config = require('../config/config');

// Register a new user
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

// Log in a user
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

// Log out a user
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// Refresh authentication tokens
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

// Generate a reset password token and send it via email
const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// Reset a user's password with a provided token
const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

// Send a verification email for email confirmation
const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

// Verify a user's email with a provided token
const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

// Google OAuth Strategy Options
const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

// Verify and authenticate a user with Google OAuth
const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    // Authenticate the Google user or create a new one if not exists
    const user = await authService.authenticateGoogleUser(profile);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Create a new Google OAuth Strategy
const googleStrategy = new GoogleStrategy(googleStrategyOptions, googleVerify);

// Initiate Google OAuth authentication
const googleOAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Handle Google OAuth callback
const googleOAuthCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' }, async (err, user) => {
    if (err) {
      return next(err);
    }

    // Generate authentication tokens for the user
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  })(req, res, next);
};

// Use the Google OAuth Strategy in Passport
passport.use(googleStrategy);

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  googleOAuth,
  googleOAuthCallback,
};
