const {logger} = require('./module/default')
const {serviceLogger} = require('./module/service')
const {daoLogger} = require('./module/dao')

module.exports = {
    logger: logger,
    serviceLogger: serviceLogger,
    daoLogger: daoLogger
}

// logger('testDefault1').debug('a', 'b', 'c', 'd');
// logger('testDefault2').info('a', 'b', 'c', 'd');
// logger('testDefault3').warn('a', 'b', 'c', 'd');
// logger('testDefault4').error('a', 'b', 'c', 'd');

// serviceLogger('testService1').debug('a', 'b', 'c', 'd');
// serviceLogger('testService2').info('a', 'b', 'c', 'd');
// serviceLogger('testService3').warn('a', 'b', 'c', 'd');
// serviceLogger('testService4').error('a', 'b', 'c', 'd');

// daoLogger('testDao1').debug('a', 'b', 'c', 'd');
// daoLogger('testDao2').info('a', 'b', 'c', 'd');
// daoLogger('testDao3').warn('a', 'b', 'c', 'd');
// daoLogger('testDao4').error('a', 'b', 'c', 'd');

