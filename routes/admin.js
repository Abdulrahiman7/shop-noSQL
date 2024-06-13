const express=require('express');

const router=express.Router();

const {TokenAuthorization}=require('../middleware/token.js');
const AdminControl=require('../controllers/admin.js');

router.post('/addProduct',TokenAuthorization, AdminControl.createProduct);

router.get('/fetchProducts',TokenAuthorization, AdminControl.fetchAllProducts);

router.get('/getProduct/:id',TokenAuthorization, AdminControl.getProductById);

router.delete('/deleteProduct/:id',TokenAuthorization, AdminControl.deleteProduct);
module.exports=router;

