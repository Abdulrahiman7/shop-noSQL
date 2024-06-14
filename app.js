const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');

require('dotenv').config();
const UserRoute=require('./routes/user.js');
const AdminRoute=require('./routes/admin.js');
const CartRoute=require('./routes/cart.js');
const { default: mongoose } = require('mongoose');

// app.use(cors);
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));


app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ['GET','POST','DELETE']
}));
  app.use(UserRoute);
  app.use(AdminRoute);
  app.use(CartRoute);

  async function connectToDatabase(){
  try{
    const dbConnect=mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.cbjfzzk.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster`);
    app.listen(3000);
    console.log('app has started listening on port 3000');
  }catch(err)
  {
    console.log(err);
  }
}

connectToDatabase();
