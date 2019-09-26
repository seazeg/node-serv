import { logger } from './module/default'
import { serviceLogger } from './module/service'
import { daoLogger } from './module/dao'
import { loggerConfig } from './module/'

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

