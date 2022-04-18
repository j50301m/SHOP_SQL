const Product=require("../models/product") //產品內容
//const User=require("../models/user")

exports.getAddProduct=(req,res,next) =>{
    res.render("admin/edit-product",{docTitle:"添加產品",
                path:"/admin/edit-product",
                activeAddProduct:true,
                breadcrumb:[
                    {name:"首頁",url:"/",hasBreadcrumbUrl:true},
                    {name:"添加商品",hasBreadcrumbUrl:false}
                ],
                editing:false,
    });
}

exports.getEditProduct=(req,res,next) =>{
    const editMode = req.query.edit;

    //判別是否為編輯模式,不是跳轉首頁
    if(!editMode)return res.redirect('/');

    const productId =req.params.productId;

    Product.findById(productId).then((product)=>{
        //沒有找到product就轉跳回首頁
        if(!product){
            return res.redirect('/');
        }
        res.render("admin/edit-product",{
            docTitle:"修改產品",
            path:"/admin/edit-product",
            activeProductManage:true,
            breadcrumb:[
            {name:"首頁",url:"/",hasBreadcrumbUrl:true},
            {name:"修改商品",hasBreadcrumbUrl:false}
            ],
            editing:editMode,
            product:product,
        });
    });

}

exports.getProducts=(req,res,next)=>{
    Product.fetchAll().then(products=>{
        res.render('admin/products',{prods:products,
            docTitle:"產品管理",
            activeProductManage:true,
            breadcrumb:[
                {name:"首頁",url:"/",hasBreadcrumbUrl:true},
                {name:"產品管理",hasBreadcrumbUrl:false},
            ],
        });
    });
}

exports.postEditProduct=(req,res,next) =>{
    const productId= req.body.productId;
    const title=req.body.title;
    const price=Number(req.body.price);
    const description =req.body.description;
    const imgUrl=req.body.imgUrl;

    Product.editById(productId,title,imgUrl,price,description).then(result=>{
        res.redirect('/admin/products');
    });

}

exports.postAddProduct=(req,res,next)=>{
    const title= req.body.title;
    const imgUrl=req.body.imgUrl;
    const description=req.body.description;
    const price=Number(req.body.price);
    console.log(req.user);
    //方法1:用自己創的static方法
    Product.save(title,imgUrl,description,price,req.user.id).then(result=>{
        //console.log(result);
        res.redirect('/admin/products');
    }).catch(err=>console.log(err));

    //方法2:用User的魔法關聯方法
    // console.log(Object.keys(User.prototype));
    // req.user
    //     .createProduct({title,imgUrl,description,price})
    //     .then(result=>{res.redirect('/admin/products');});
}

exports.postDeleteProduct=(req,res,next)=>{
    const productId=req.body.productId;
    Product.deleteById(productId).then(result=>{
        //console.log(result);
        res.redirect('/admin/products');
    }).catch(err=>console.log(err));

}

