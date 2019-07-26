const express = require('express');
const bcrypt = require('bcrypt-nodejs');
// Creating router 
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();

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
router.post('/', async(req,res, next) => {
    const {userId, userPassword} = req.body;
    try{
        const exUser = await User.findOne({userId : userId});
        if(exUser){
            return res.status(403).send("이미 사용중인 아이디입니다.");
        }else{
            await bcrypt.hash(userPassword, null, null, async(error,hash) => {
                if(error) return console.log(error);
                const newUser = new User({
                    userId,
                    userPassword: hash
                });
                await newUser.save();
            })
        }
        return res.status(200)
    }
    catch(e){
        console.error(e);
        return next(e);
    }
});
module.exports = router;