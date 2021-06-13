const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
    const token = req.header.token;
    console.log(req.header);
    if (!token)
        return res.status(403).json({
            message: "Please login!!",
        });
    try {
        console.log(req.header);
        const decoded = jwt.verify(token, "jwt_secret");
        console.log("decoded", decoded);
        next();
    } catch (e) {
        console.error(e);
        res.status(400).json({
            message: "Invalid Token!!",
        });
    }
};

module.exports = auth;
