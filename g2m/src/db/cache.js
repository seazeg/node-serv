// cache.js
import redis from 'redis';
import log from '../../utils/console'

const cache = {
    client: null,
    connect: function () {
        this.client = redis.createClient(6379, '127.0.0.1');
        this.client.on('error', function (err) {
            log.error('redisCache Error ' + err);
        });
        this.client.on('ready', function () {
            log.info('redisCache connection succeed');
        });
    },
    init: function () {
        this.connect(); 
        const instance = this.client;
        const get = instance.get;
        const set = instance.set;

        instance.set = function (key, value, callback) {
            if (value !== undefined) {
                set.call(instance, key, JSON.stringify(value), callback);
            }
        };

        instance.get = function (key, callback) {
            get.call(instance, key, (err, val) => {
                if (err) {
                    log.warn('redis.get: ', key, err);
                }
                callback(null, JSON.parse(val));
            });
        };
        return instance;
    }
};

export default cache.init()
