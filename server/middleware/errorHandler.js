const errorHandler = (err, req, res, next) => {
  console.log("Error caught by middleware:", err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    msg: err.message || "Server Error",
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
