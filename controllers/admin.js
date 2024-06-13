
const  Product  = require("../model/product");


exports.createProduct= async (req, res, next)=>{
    try{
        let {title, price, description, imageUrl, id}= req.body;
        if(id === "") id=null;
            const product=new Product(title, +price, description, imageUrl, id);
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
        const productDeletion=await Product.deleteProduct(id);
        res.status(200).json({deletedProduct:id})
    }catch(err)
    {
        res.status(500).json({message: 'internal sever Error'});
    }
}

exports.fetchAllProducts=async (req, res, next)=>{
    try{

        const products=await Product.getAllProducts();
        res.status(200).json(products);
        
    }catch(err)
    {
        res.status(500).json({message: 'internal sever Error'});
    }
}

exports.getProductById=async (req, res, next)=>{
    try{
        const userId= req.params.id;
        const product=Product.getProductById()
        res.status(200).json(product);
    }catch(err)
    {
        res.status(500).json({message: 'internal sever Error'});
    }
}
