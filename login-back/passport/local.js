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
                return done(null, false, {reason: '존재하지 않는 사용자입니다!'});
            }
            bcrypt.compare(password, user.userPassword, (err,result) => {
                if(result){
                    return done(null, user);
                }
                return done(null, false, {reason: '비밀번호가 틀립니다.'});
            });
        }
        catch(e){
            console.error(e);
            return done(e);
        }
    }));

}