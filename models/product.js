const {Sequelize,DataTypes,Model}=require('sequelize');

const sequelize= require('../util/database');

class Product extends Model{
    static fetchAll(){
        return this.findAll();
    }

    static findById(id){
        return this.findByPk(id).then(product=>{
            return product;
        });
    }

    static editById(id,title,imgUrl,price,description){
        //方法1
        return this.findByPk(id).then(product=>{
            product.title=title,
            product.imgUrl=imgUrl,
            product.price=price,
            product.description=description
            return product.save();
        });
        //方法2 update 會返回一個更新條數
        return this.update({title,imgUrl,description,price},{where:{id:id}});
    }

    static deleteById(id){
        //方法1
        return this.findByPk(id).then(product=>{
             return product.destroy();
        });
        //方法2
        return this.destroy({where:{id:id}});
    }

    static save(title,imgUrl,description,price,userId){
        return this.create({title:title,imgUrl:imgUrl,description:description,price:price,userId:userId});
    }
}

//定義表的內容
Product.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNullL:false,
        primaryKey:true,
    },
    title:{type:DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.DOUBLE,allowNullL:false},
    imgUrl:{type:DataTypes.STRING,allowNullL:false},
    description:{type:DataTypes.STRING,allowNullL:false},
    },{
    //其他模型參數
    sequelize, //傳遞連接資料庫的實例
    modelName:'product' //模型名稱,在魔法關聯方法內使用的名字
    });


// const Product =sequelize.define('Product',{
//     id:{
//         type:DataTypes.INTEGER,
//         autoIncrement:true,
//         allowNullL:false,
//         primaryKey:true,

//     },
//     title:{type:DataTypes.STRING,allowNull:false},
//     price:{type:DataTypes.DOUBLE,allowNullL:false},
//     imgUrl:{type:DataTypes.STRING,allowNullL:false},
//     description:{type:DataTypes.STRING,allowNullL:false},
// });

module.exports=Product;