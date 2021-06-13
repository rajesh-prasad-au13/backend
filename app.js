const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const MongoClient = require("mongodb").MongoClient;
const template_path = path.join(__dirname, "./views");
require("./src/db/connect")();
const user = require("./src/schema/user");
const auth = require("./controller/authLogin");
const isLoggedOut = require("./controller/isLoggedOut");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/signup", isLoggedOut, (req, res) => {
    res.render("signup.hbs");
});

app.post("/signup", async (req, res) => {
    console.log(req.body.password, req.body.confirm_password);
    if ((req.body, req.body.password == req.body.confirm_password)) {
        try {
            const newuser = new user({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                website: req.body.website,
                address: req.body.address,
                phone: req.body.phone,
            });
            await newuser.save();
            res.json({
                Message: "Signup success",
            });
        } catch (error) {
            res.json({
                error,
            });
        }
    } else {
        res.json({
            Message: "Password Mismatch",
        });
    }
});

app.get("/login", (req, res) => {
    res.render("login.hbs");
});

app.post("/login", (req, res) => {
    console.log("req.body", req.body);
    var url =
        "mongodb+srv://rajesh97:rajesh24@cluster0.p5rlo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        let anyuser = await dbo
            .collection("users")
            .findOne({ email: req.body.Email });

        if (anyuser == null) {
            res.json({
                message: "No such user exists",
            });
        } else {
            if (req.body.password == anyuser.password) {
                jwt.sign(
                    { db: { email: db.email } },
                    "jwt_secret",
                    (err, token) => {
                        if (err) throw err;
                        console.log("token", token);
                        req.header.token = token;
                        console.log("db", req.body.Email);
                        res.redirect(`/profile/${req.body.Email}`);
                    }
                );
            } else {
                res.status(403).json({
                    message: "Password mismatch",
                });
            }
            db.close();
        }
    });
});

app.get("/logout", (req, res) => {
    req.header.token = "";
    console.log("Logging OUT");
    res.json({
        message: "Logged Out",
    });
});

app.get("/profile/:email", auth, (req, res) => {
    var url =
        "mongodb+srv://rajesh97:rajesh24@cluster0.p5rlo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    MongoClient.connect(url, function (err, db) {
        // console.log("here 2 ")
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        dbo.collection("users").findOne(
            { email: req.params.email },
            function (err, db) {
                console.log("Listing One with Email ", db);
                res.render("profile.hbs", { db });
            }
        );
    });
});

app.listen(3000, () => console.log("Server started at 3000"));
