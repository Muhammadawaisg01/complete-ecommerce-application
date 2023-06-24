
const app = require("./app")
const connect_database = require("./config/database");
const dotenv = require('dotenv');

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

const path = require('path');
dotenv.config({ path: 'E:\\Node JS Projects\\E-Commerce Website\\backend\\config\\config.env' });

console.log("PORT   ", process.env.PORT);

connect_database();

const server = app.listen(process.env.PORT, () => {
    console.log('Server is connected on port  ', process.env.PORT);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})

