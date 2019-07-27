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