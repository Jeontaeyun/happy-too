# Happy Too Login Task |  BACKEND

## 01. About Architecture

### (01) BACKEND Architecture

- Language : Node.js 
- Server Framework : Express
- DataBase : MongoDB , Mongoose(ODM)
- Authentication : Passport.js
- HTTP Log : morgan.js
- Environment Value : dotenv
- Cookie and Session : cookie-parser, express-session

This project I use the MongoDb because It's not that biger to use MySQL.  And I use the Passport.js for authentication and I am going to reviewing passport.js's usage

### (02) Passport.js

#### 01) How to use Passport.js

[/passport/index.js]

```javascript

const passport = require('passport');
const local = require('./local');
const User = require('../models/user');

module.exports = () => {
    // Making Session when first login
    // It save only _id and cookie at server-side
    passport.serializeUser((user, done)=>{
        return done(null, user._id);
    });
    // Every reload this make deserializeUser from user._id
    // And make userInfo
    passport.deserializeUser(async (id, done)=>{
        try{
            const user = await User.findOne({_id: id});
            return done(null, user);
        }
        catch(e){
            console.error(e);
            return done(e);
        }
    });
    local();
};

```


[/passport/local.js]

```javascript

/*Setting Local Strategy*/
const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
// For security of management we got to use bcrypt
const bcrypt = require('bcrypt-nodejs');
const User =require('../models/user');

module.exports = () =>{
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPassword'
    }, async (username, password, done) => {
        try{
            const user = await User.findOne({userId: username});
            if(!user){
                return done(null, false, {reason: 'There is no user'});
            }
            bcrypt.compare(password, user.userPassword, (err,result) => {
                if(result){
                    return done(null, user);
                }
                return done(null, false, {reason: 'Wrong with password'});
            });
        }
        catch(e){
            console.error(e);
            return done(e);
        }
    }));

}

```

[/inex.js]

```javascript

(...)

const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./passport');

//Create MongoDB with Mongoose(ODM)
const {MONGO_URI: mongoURI, COOKIE_SECRET: signKey} = process.env;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useNewUrlParser: true}).then(()=>{
    console.log('Connected to MongoDB');    
}).catch((e)=> {
    console.error(e);
});

(...)

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

(...)

```

- It is really important to write passport initialize afeter setting session and cookie.

[/routes/index.js]

```javascript

router.post('/login', (req,res, next) => {
    passport.authenticate('local', (err,user,info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, (loginErr)=>{
            if(loginErr){
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.userPassword;
            return res.json(filteredUser);
        })
    })(req,res,next);
    // For using passport's Authenticate, it is HOF so we add (req,res,next) at last
});

(...)

router.post('/logout', (req,res, next) => {
    try{
        req.logout();
        req.session.destroy();
    }
    catch(e){
        console.error(e);
        return next(e);
    }
});

```

- It is really important to know when using passport.authenticate(), we need to add (req, res, next) like this ```passport.authenticate(...)(req, res, next); ```

#### 02) Serialize and Deserialize at Passport

Function    |  Description
--------    | -----------------------------------------------------------------------------------
Serialize   | Save user's id and cookie at server-side
Deserialize | Every the page reloading, the database save user info at req.user based on id saved at server-side