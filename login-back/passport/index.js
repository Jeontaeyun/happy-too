const passport = require('passport');
const local = require('./local');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done)=>{                          // Server Side로 [{id:3, cookie: 'adf'}] 세션을 남긴다.
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done)=>{
        try{
            const user = await User.findOne({_id: id});
            return done(null, user);                                // req.user로 Request문에 데이터를 넣어준다.
        }
        catch(e){
            console.error(e);
            return done(e);
        }
    });
    local();
};