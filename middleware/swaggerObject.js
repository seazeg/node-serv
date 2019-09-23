"use strict";

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * used for building swagger docs object
 */
const is_type_of_1 = __importDefault(require("is-type-of"));
const ramda_1 = __importDefault(require("ramda"));
const utils_1 = require("./utils");
let SwaggerObject = class SwaggerObject {
    constructor() {
        this.data = {};
    }
    add(target, name, content) {
        if (!is_type_of_1.default.object(content)) {
            throw new Error('illegal params [content] for SwaggerObject.add');
        }
        // when using non-static method decorators
        // target will be class.prototype rather than class
        // hack and make target always be class itself
        if (!target.prototype && target.constructor) {
            target = target.constructor;
        }
        const key = `${target.name}-${name}`;
        if (!this.data[key]) this.data[key] = {};
        // merge class decorator and method decorator if it is an array
        // eg. query parameters, tag paramemters
        Object.keys(content).forEach(k => {
            if (is_type_of_1.default.array(this.data[key][k])) {
                this.data[key][k] = [...this.data[key][k], ...content[k]];
                if (this.data[key][k].length === 0) return;
                this.data[key][k] = is_type_of_1.default.object(this.data[key][k][0]) ? ramda_1.default.uniqBy(o => o.name, this.data[key][k]) : ramda_1.default.uniq(this.data[key][k]);
            } else {
                Object.assign(this.data[key], { [k]: content[k] });
            }
        });
    }
    // only add to methods with a @request decorator
    addMulti(target, content, filters = ['ALL']) {
        const staticMethods = Object.getOwnPropertyNames(target).filter(method => !utils_1.reservedMethodNames.includes(method));
        const methods = Object.getOwnPropertyNames(target.prototype).filter(method => !utils_1.reservedMethodNames.includes(method));
        [...staticMethods, ...methods].forEach(name => {
            const key = `${target.name}-${name}`;
            if (!this.data[key] || !this.data[key].request) return;
            filters = filters.map(i => i.toLowerCase());
            if (filters.includes('all') || filters.includes(this.data[key].request.method)) {
                this.add(target, name, content);
            }
        });
    }
};

const swaggerObject = new SwaggerObject();
exports.default = swaggerObject;