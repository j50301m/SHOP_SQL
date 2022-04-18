const express=require('express');
const path =require("path");
const shopController=require("../controllers/shop");

const router=express.Router();

router.get('/',shopController.getIndex);

router.get('/product-list',shopController.getProducts);

router.get('/product-detail/:productId',shopController.getProductDetail);

router.get('/cart',shopController.getCart);

router.get('/checkout',shopController.getCheckout);

router.post('/add-to-cart',shopController.postAddToCart);

router.post('/cart-delete-product',shopController.postCartDeleteProduct);

router.post('/create-order',shopController.postCreateOrder);

module.exports=router;