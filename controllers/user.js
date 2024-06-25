const User=require('../model/user');
const { hash, compare } =require('bcrypt');
const jwt=require('jsonwebtoken');


exports.newUser=async (req, res, next)=>{
try{
    console.log('entered the new user');
    const { name, email, password, number}= req.body;
    const checkExistingUser=await User.findOne(
        {
            $or:[
                {email: email} ,
                {number: number}
            ]
        });
    
    if(checkExistingUser !== null)
    {
       res.status(409).json({message: 'User already exists'});
    }else{
    const encodedPassword=hash(password, 10, async (err, hash)=>{
        if(err)
        {
            res.status(500).json({message: 'internal server error'});
        }else{
            const user=new User({
                name:name, 
                email:email, 
                password:hash, 
                number:number});
        await user.save();
        res.status(200).json(user);
        }
        
    })
}
}catch(err)
{
    console.log(err);
    res.status(500).json({message: 'Internal Server Error'});
}
}

exports.userLogin=async (req, res, next)=>{
    try{
        const {email, password}=req.body;
        const isExistingUser=await User.findOne({email:email});
        if(isExistingUser)
        {
            const matchPassword=await compare(password,isExistingUser.password)
            if(matchPassword){
                const token=jwt.sign(email, process.env.JWT_SECRET_KEY );
                res.status(200).json({token, email});

            }else res.status(401).json({message: 'incorrect password'});
        }else res.status(404).json({message: 'User not found'});
    }catch(err)
    {
        res.status(500).json({message: 'Internal Server Error'});
    }
}