const express = require('express');
const bcryt = require('bcrypt-nodejs');
// Creating router 
const router = express.Router();
router.post('/login', (req,res, next) => {
    try{

    }
    catch(e){
        console.error(e);
        return next(e);
    }
})
router.post('/logout', (req,res, next) => {
    try{

    }
    catch(e){
        console.error(e);
        return next(e);
    }
})
router.post('/register', (req,res, next) => {
    try{

    }
    catch(e){
        console.error(e);
        return next(e);
    }
})