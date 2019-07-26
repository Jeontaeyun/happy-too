const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const morgan = require('morgan');
const userAPIRouter = require('./routes');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./passport');
const cors = require('cors');
//Config .env
dotenv.config();

//Create MongoDB with Mongoose(ODM)
const {MONGO_URI: mongoURI, COOKIE_SECRET: signKey} = process.env;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useNewUrlParser: true}).then(()=>{
    console.log('Connected to MongoDB');    
}).catch((e)=> {
    console.error(e);
});

//Create Express App
const app = express();

// Middleware for Log from Request
app.use(morgan('dev'));
// Middleware for solving CORS problem
// For tarnsform COOKIE each other which is having different domain
app.use(cors({
    origin: true,
    credentials: true
}));
// Middleware for using body inclueded JSON
app.use(express.json());
// Middleware for using Cookie with different Domain
app.use(cookieParser(signKey));
// Middleware for using Session for Authentication
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    // Session 
    secret: signKey,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: "wefjlwejaljgljwkel"
}));

// After setting express session and cookie, Passport setting
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use('/api/user', userAPIRouter);

app.listen(8080, () => {
    console.log("Serever is running on localhost:8080")
});