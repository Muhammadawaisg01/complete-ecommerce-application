

const mongoose = require('mongoose');

const connect_database = () => {
    mongoose.connect(process.env.DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log("Database Connected   ", data.connection.host);
        })
        .catch((err) => {
            console.log("The error is   ", err);
        })
}

module.exports = connect_database;
