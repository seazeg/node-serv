"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
let PropertyOptions = class PropertyOptions {
    constructor() {
        /**
         *
         */
        this.type = null;
        /**
         *
         */
        this.required = null;
        /**
         *
         */
        this.example = null;
        /**
         *
         */
        this.description = null;
        /**
         *
         */
        this.items = null;
    }
};

exports.PropertyOptions = PropertyOptions;
/**
 *
 * @param source
 */
function deepClone(source) {
    if (!source || typeof source !== 'object') {
        return null;
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}
/**
 * Made for empty class
 * @param constructor
 */
function swaggerClass(constructor) {
    return function (target, propertyKey, descriptor) {
        if (target.swaggerDocument == undefined) target.swaggerDocument = {};
        if (target.swaggerClass == undefined) target.swaggerClass = target;
        if (target.swaggerClass != target) {
            target.swaggerClass = target;
            target.swaggerDocument = deepClone(target.swaggerDocument);
        }
    };
}
exports.swaggerClass = swaggerClass;
;
/**
 *
 * @param type
 * @param options
 */
function swaggerProperty(options) {
    return function (target, propertyKey, descriptor) {
        if (target.constructor.swaggerDocument == undefined) target.constructor.swaggerDocument = {};
        if (target.constructor.swaggerClass == undefined) target.constructor.swaggerClass = target.constructor;
        if (target.constructor.swaggerClass != target.constructor) {
            target.constructor.swaggerClass = target.constructor;
            target.constructor.swaggerDocument = deepClone(target.constructor.swaggerDocument);
        }
        target.constructor.swaggerDocument[propertyKey] = options;
    };
}
exports.swaggerProperty = swaggerProperty;
;