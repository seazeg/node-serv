import { daoConfig } from './dao'
import { defaultConfig } from './default'
import { serviceConfig } from './service'

export const loggerConfig = (conf) => {
    daoConfig(conf)
    defaultConfig(conf)
    serviceConfig(conf)
}