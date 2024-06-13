const  User  = require("../model/user");
const jwt=require('jsonwebtoken');

exports.TokenAuthorization=async (req, res, next)=>{
    try{
        const token=req.headers.authorization;
        const key=process.env.JWT_SECRET_KEY;
        const auth=jwt.verify(token, key);
        const user=await User.findUser(auth);
        if (user) {
            req.user = new User(user.name, user.email, null, null, user.cart, user._id);
            return next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }

    }catch(err)
    {
        console.log(err);
    }
}