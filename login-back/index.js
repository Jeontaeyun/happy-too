const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const morgan = require('morgan');
const userAPIRouter = require('./routes');

//Create Express App
const app = express();

//Config .env
dotenv.config();
// Middleware for Log from Request
app.use(morgan('dev'));
// Middleware for using body inclueded JSON
app.use(express.json());
// Middleware for using Cookie with different Domain
app.use(cookieParser(process.env.COOKIE_SECRET));
// Middleware for using Session for Authentication
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    // Session 
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: "wefjlwejaljgljwkel"
}));

app.use('/api/user', userAPIRouter);

app.listen(8080, () => {
    console.log("Serever is running on localhost:8080")
});