import { request, summary, tags, query, body, prefix } from '../middleware/swagger'
import { logger, serviceLogger, daoLogger } from './logger'
import { g2m } from './server'

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
    decorators,
    g2m
}