const express=require('express');

const router=express.Router();
const {TokenAuthorization}=require('../middleware/token.js');
const CartControl=require('../controllers/cart.js')

router.get('/getCartItems',TokenAuthorization, CartControl.getCartItems);

router.post('/addToCart',TokenAuthorization, CartControl.addToCart);

router.post('/changeQuantity',TokenAuthorization, CartControl.changeQuantity);

router.get('/createOrder',TokenAuthorization, CartControl.createOrder);
module.exports= router;