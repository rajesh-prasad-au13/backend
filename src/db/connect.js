const mongoose = require("mongoose");

const URI =
    "mongodb+srv://rajesh97:rajesh24@cluster0.p5rlo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
    console.log("CONNECTED TO MONGOdb ATLAS");
};

module.exports = connectDB;
