const { MongoClient } = require('mongodb');


let _db;

const mongoConnect= async callback=>{
    try{
        const clientConnection= await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.cbjfzzk.mongodb.net/?retryWrites=true&w=majority`);
        _db=clientConnection.db('shop');
        callback();
    }catch(err)
    {
        console.log(err);
    }
    
}

const getDb= ()=>{
    if(_db) return _db;
    else throw 'Database not found';
}

module.exports={mongoConnect, getDb};