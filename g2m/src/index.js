import { request, summary, tags, query, body, prefix } from '../middleware/swagger'
import { logger, serviceLogger, daoLogger } from './logger'

const decorators = {
    request, 
    summary, 
    tags, 
    query, 
    body, 
    prefix
}

export {
    logger,
    serviceLogger,
    daoLogger,
    decorators
}