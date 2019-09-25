import Sequelize from 'sequelize';
import {
    sequelize
} from './db';

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
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