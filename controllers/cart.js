const { ObjectId } = require('mongodb');
const Product=require('../model/product');
const User=require('../model/user');

exports.getCartItems= async (req, res, next)=>{
    try{
        const cart=await req.user.populate('cart.items.productId');
        const updatedCartItems=cart.cart.items;
        res.status(200).json({updatedCartItems});
    }catch(err)
    {
        console.log(err);
    }
}


exports.addToCart= async (req, res, next)=>{
    try{
        let prodId=req.body.id;
        const addProduct=await req.user.addToCart(prodId);
        res.status(200).json();

    }catch(err)
    {
        console.log(err);
    }
}

exports.changeQuantity= async (req, res, next)=>{
    try{
        const {id, quantity}=req.body;
        const updateCart=req.user.changeCartItemQuantity(id, quantity);
        res.status(200).json();
        

    }catch(err)
    {
        console.log(err);
    }
}

exports.createOrder=async (req, res, next)=>{
    try{
       const generateOrder=await req.user.createOrder();
        res.status(200).json(generateOrder);

    }catch(err)
    {
        console.log(err);
    }
}
