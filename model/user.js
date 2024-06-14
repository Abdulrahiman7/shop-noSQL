const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required: true
    },
    number:
    {
        type: Number,
        required: true,
        unique: true
    },
    cart:
    {
        items:[
            {
                productId:
                {
                    type: Schema.Types.ObjectId,
                    ref:'Product',
                    required: true
                },
                quantity:
                {
                    type:Number,
                    required: true
                }
            }
        ]
        
    }
});

userSchema.methods.addToCart= async function(prodId)
{
    try{
         
          const existingCartProductIndex=this.cart.items.findIndex(cp=>{
              return cp.id.toString()===prodId.toString();
           });
          
           if(existingCartProductIndex !== -1)
           {
               return;
           }else{
               this.cart.items.push({productId:prodId, quantity:1});
           }
           const updatedCart={items:[...this.cart.items]};
           this.cart=updatedCart;
           this.save();
       }catch(err)
       {
           console.log(err);
       }
}

userSchema.methods.changeCartItemQuantity=async function(id, quantity)
{
    try{
    const cartItemIndex=this.cart.items.findIndex(item=> item.productId.toString()===id);
    if(cartItemIndex !== -1)
    {
    if( quantity === -1 || quantity=== 1)
    {
        this.cart.items[cartItemIndex].quantity += quantity;
    }
    if(quantity === 0 ||  this.cart.items[cartItemIndex].quantity <= 0)
    {
        const deleteCartItem=this.cart.items.splice(cartItemIndex, 1);
    }
    await this.save();
    } 
    return ;
}catch(err)
{
    console.log(err);
}  
}

module.exports= mongoose.model('User',userSchema);





// const { ObjectId } = require('mongodb');
// const { getDb } = require('../util/database');



// class User{
//     constructor(name, email, password, number, cart = { items: [], totalPrice: 0 },_id)
//     {
//         this.name=name;
//         this.email=email;
//         this.password=password;
//         this.number=number;
//         this.cart=cart;
//         this._id=_id;
//     }

//     async save()
//     {
//         try{
//             const db=getDb();
//             return await db.collection('users').insertOne(this);
//         }catch(err)
//         {
//             console.log(err);
//         }
//     }

//     async addToCart(product)
//     {
//         try{
         
//             const existingCartProductIndex=this.cart.items.findIndex(cp=>{
//                return cp.id.toString()==product._id.toString();
//             });
           
//             if(existingCartProductIndex !== -1)
//             {
//                 return;
//             }else{
//                 this.cart.items.push({id:product._id, quantity:1});
//             }
//             const updatedCart={items:[...this.cart.items]};
//             const db=getDb();
//             return await db.collection('users').updateOne({_id: this._id},{$set: { cart: updatedCart}});
//         }catch(err)
//         {
//             console.log(err);
//         }
//     }

//     async changeProductQuantity(product, quantity){
//         try{
//         const existingCartProductIndex=this.cart.items.findIndex(cp=>{
//             return cp.id.toString()==product._id.toString();
//          });
        
//          if(existingCartProductIndex !== -1)
//          {
//              this.cart.items[existingCartProductIndex].quantity += +quantity;
//              if(this.cart.items[existingCartProductIndex].quantity <= 0 || quantity == 0)
//              {
//                 this.cart.items.splice(existingCartProductIndex, 1);
//              }
//              const updatedCart={items:[...this.cart.items]};
//              const db=getDb();
//              return await db.collection('users').updateOne({_id: this._id},{$set: { cart: updatedCart}});
//          }else return;
        
//         }
//         catch(err){
//             console.log(err);
//         }
//     }   

//     async createOrder()
//     {
//         try{
//             const db=getDb();
//         const order= await db.collection('orders').insertOne({
//             userId:this._id,
//             items:this.cart
//         });
//         const updatedCart={items:[]};
//         const emptycart= await db.collection('users').updateOne({_id: this._id},{$set: { cart: updatedCart}});
//         return order;
//         }catch(err)
//         {
//             console.log(err);
//         }
        

//     }

//     static async findUser(email)
//     {
//         try{
//             const db=getDb();
//             return await db.collection('users').findOne({email:email});
//         }catch(err)
//         {
//             console.log(err);
//         }
//     }
// }

// module.exports=User;