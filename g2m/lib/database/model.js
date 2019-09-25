'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _db.sequelize.define('user', {
    firstName: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    lastName: {
        type: _sequelize2.default.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// 创建表，force 为 true 时会先执行 drop 再创建
User.sync({
    force: false
});

// // 创建新用户
User.create({
    firstName: "Jane",
    lastName: "Doe"
}).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
});

User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
});

// // 删除所有名为“Jane”的人
// User.destroy({
//     where: {
//         firstName: "Jane"
//     }
// }).then(() => {
//     console.log("Done");
// });

// // 将所有没有姓氏的人改为“Doe”
// User.update({
//     lastName: "Doe"
// }, {
//     where: {
//         lastName: null
//     }
// }).then(() => {
//     console.log("Done");
// });