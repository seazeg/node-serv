import Sequelize from 'sequelize';
import { serviceLogger } from '../logger';

/**
 * 连接指定类型的数据库
 * host：数据库地址
 * max：连接池最大连接数量
 * min：连接池最小连接数量
 * idle：每个线程最长等待时间
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
    database:'testdata',
    username:'root',
    password:'Zhou123$%^',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0, 
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        serviceLogger('database:mysql').info('数据库连接成功.')
    })
    .catch(err => {
        serviceLogger('database:mysql').error('Unable to connect to the database:', err)
    });

export {
    sequelize
}

