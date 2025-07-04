const errorHandler = (res, error, statusCode = 500) => {
  console.error('ERROR:', error.message || error);
  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
