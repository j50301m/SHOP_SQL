const {Sequelize} =require('sequelize');

const sequelize=new Sequelize('nodejs-shop','root','2swx3dec',{dialect:'mysql',host:'localHost',timezone:'+08:00'});

module.exports=sequelize;