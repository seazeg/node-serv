"use strict";
/**
 * init swagger definitions
 * @param {String} title
 * @param {String} description
 * @param {String} version
 * @param {Object} options other options for swagger definition
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (title = 'API DOC', description = 'API DOC', version = '1.0.0', options = {}) => Object.assign({
    info: { title, description, version },
    paths: {},
    responses: {}
}, {
    definitions: {},
    tags: [],
    swagger: '2.0',
    securityDefinitions: {
        ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization'
        }
    }
}, options);