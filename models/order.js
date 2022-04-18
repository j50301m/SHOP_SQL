const {Sequelize,DataTypes,Model} =require('sequelize');

const sequelize= require('../util/database');

class Order extends Model{}

Order.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNullL:false,
        primaryKey:true,
    }},{
    //其他模型參數
    sequelize, //傳遞連接資料庫的實例
    modelName:'order' //模型名稱,在魔法關聯方法內使用的名字
});

module.exports=Order;