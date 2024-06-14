
const  Product  = require("../model/product");


exports.createProduct= async (req, res, next)=>{
    try{
        let {title, price, description, imageUrl, id}= req.body;
        
            const product=new Product({
                title:title, 
                price:+price, 
                description:description, 
                imageUrl:imageUrl});
            await product.save();
            res.status(200).json(product);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({message: 'Internal sever Error'});
    }
}

exports.deleteProduct=async (req, res, next)=>{
    try{
        const id= req.params.id;
        const productDeletion=await Product.findByIdAndDelete(id);
        res.status(200).json({deletedProduct:id})
    }catch(err)
    {
        res.status(500).json({message: 'internal sever Error'});
    }
}

exports.fetchAllProducts=async (req, res, next)=>{
    try{

        const products=await Product.find();
        res.status(200).json(products);
        
    }catch(err)
    {
        res.status(500).json({message: 'internal sever Error'});
    }
}

exports.getProductById=async (req, res, next)=>{
    try{
        const userId= req.params.id;
        const product=await Product.findById(userId);
        console.log(product);
        res.status(200).json(product);
    }catch(err)
    {
        res.status(500).json({message: 'internal sever Error'});
    }
}

exports.postEditProduct=async (req, res, next)=>{
    try{
        let {title, price, description, imageUrl, id}= req.body;
            const product=await Product.findById(id);
            product.title=title;
            product.price=price;
            product.description=description;
            product.imageUrl=imageUrl;
            await product.save();
            res.status(200).json(product);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({message: 'Internal sever Error'});
    }
}