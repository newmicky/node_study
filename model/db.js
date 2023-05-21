var Sequelize = require('sequelize');
var sequelize;
sequelize = new Sequelize("class101", "root", "gxywxt0679!m", {
    host:'localhost',
    port: 3306,
    dialect:'mysql',
    timezone:'Asia/Seoul',
    define: {
        charset:'utf8',
        collate:'utf8_general_ci',
        timestamps: true,
        freezeTableName: true,
    }
});

var db = {};
db.users = require(__dirname + "/users.js")(sequelize,Sequelize.DataTypes); //sequelize,Sequelize.DataTypes 에러수정을 위해 추가한 소스
db.reviews = require(__dirname + "/reviews.js")(sequelize,Sequelize.DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;