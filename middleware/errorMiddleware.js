const errorHandler = (err, req, res, next) => {
  //Gets and sets the status code by received status code otherwise set to 500 
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    //returns the error message
    message: err.message,
    //Only show stack when deployed
    stack: process.env.NODE_ENV == 'production' ? null : err.stack
  })
}

module.exports = {
  errorHandler,
}