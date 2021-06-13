const isLoggedOut = function (req, res, next) {
    const token = req.header.token ? req.header.token : "";
    console.log(req.header);
    if (token)
        return res.status(403).json({
            message: "Please logout first!!",
        });
    next();
};

module.exports = isLoggedOut;
