const {Sequelize,DataTypes,Model} =require('sequelize');

const sequelize= require('../util/database');

class User extends Model{
    static save(name,email){
        return this.create({name:name,email:email});
    }
    static findById(id){
        return this.findByPk(id);
    }

}

User.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNullL:false,
        primaryKey:true,
    },
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNullL:false},
    },{
    //其他模型參數
    sequelize, //傳遞連接資料庫的實例
    modelName:'user' //模型名稱,在魔法關聯方法內使用的名字
});

module.exports=User;
