'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _console = require('../../utils/console');

var _console2 = _interopRequireDefault(_console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// cache.js
const cache = {
    client: null,
    connect: function () {
        this.client = _redis2.default.createClient(6379, '127.0.0.1');
        this.client.on('error', function (err) {
            _console2.default.error('redisCache Error ' + err);
        });
        this.client.on('ready', function () {
            _console2.default.info('redisCache connection succeed');
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
                    _console2.default.warn('redis.get: ', key, err);
                }
                callback(null, JSON.parse(val));
            });
        };
        return instance;
    }
};

exports.default = cache.init();