const { ObjectId } = require('mongodb');
const Product=require('../model/product');
const User=require('../model/user');

exports.getCartItems= async (req, res, next)=>{
    try{
        const cartItemsId=req.user.cart.items;
        const cartItems=[];
        if(cartItemsId.length)
        {
            for (const item of cartItemsId) {
                const product=await Product.getProductById(item.id);
                product.quantity=item.quantity;
                cartItems.push(product);
            };
        }
        
        res.status(200).json({cartItems});
    }catch(err)
    {
        console.log(err);
    }
}


exports.addToCart= async (req, res, next)=>{
    try{
        let prodId=req.body.id;


        const product=await Product.getProductById(new ObjectId(`${prodId}`));
        const addProduct=await req.user.addToCart(product);
        res.status(200).json();

    }catch(err)
    {
        console.log(err);
    }
}

exports.changeQuantity= async (req, res, next)=>{
    try{
        const {id, quantity}=req.body;

        const product=await Product.getProductById(new ObjectId(`${id}`));
    const addProduct=await req.user.changeProductQuantity(product, quantity);
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
