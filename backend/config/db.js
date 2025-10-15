const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("MongoDB conectado");
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;