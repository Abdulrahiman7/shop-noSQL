const express=require('express');

const router=express.Router();

const UserControl=require('../controllers/user.js')

router.post('/login',UserControl.userLogin);

router.post('/signup',UserControl.newUser);

module.exports= router;