const requestLogger = (req, res, next) => {
    const timestamp = new Date().toDateString
    console.log(`${timestamp}-${req.method}- ${req.url}`)
};

module.exports = requestLogger
