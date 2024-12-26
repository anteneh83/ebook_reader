// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack
    res.status(500).json({
      message: err.message || 'Something went wrong!',
    });
  };
  
  module.exports = errorHandler;
  