const logger = (req, res, next) => {
    console.log(req.body);
    next();
};
module.exports = logger;