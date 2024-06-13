const { getDb }= require('../util/database');
const { ObjectId }=require('mongodb') ;

class Product{
    constructor(title, price, description, imageUrl, _id)
    {
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        this._id=_id;
    }

    async save()
    {
        try{
            const db=getDb();
            if(this._id)
            {
                return await db.collection('products').updateOne({_id:ObjectId(this._id)},{$set:{'title':this.title,
                'price':this.price,
                'description':this.description,
                'imageUrl':this.imageUrl}})
            }else{
               return await db.collection('products').insertOne(this);
            }
        }catch(err)
        {
            console.log(err);
        }
       
    }

    static async deleteProduct(id)
    {
        try{
            const db=getDb();
            return await db.collection('products').deleteOne({_id:new ObjectId(`${id}`)});
        }catch(err)
        {
            console.log(err);
        }
    }

    static async getAllProducts()
    {
        try{
            const db=getDb();
            const products=await db.collection('products').find().toArray();
            return products.map(product =>{
                return{
                    ...product,
                    _id:product._id.toString()
                }
            });
        }catch(err)
        {
            console.log(err);
        }
    }

    static async getProductById(id)
    {
        try{
            const db=getDb();
            return await db.collection('products').findOne({_id:id});
        }catch(err)
        {
            console.log(err);
        }
    }
}

module.exports=Product;