import { logger } from './model/default'
import { serviceLogger } from './model/service'
import { daoLogger } from './model/dao'
import { loggerConfig } from './model'

export{
    logger,
    serviceLogger,
    daoLogger,
    loggerConfig
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

