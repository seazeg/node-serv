"use strict";

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_type_of_1 = __importDefault(require("is-type-of"));
const ramda_1 = __importDefault(require("ramda"));
const cRequired = (input, expect = {}) => {
    if (expect.required && input === undefined) {
        return { is: false };
    }
    return { is: true, val: input };
};
const cNullable = (input, expect = {}) => {
    if (expect.nullable && is_type_of_1.default.null(input)) {
        return { is: true, val: input };
    }
    return { is: false, val: input };
};
const cEnum = (input, expect = {}) => {
    if (Array.isArray(expect.enum) && expect.enum.length) {
        return expect.enum.includes(input) ? { is: true, val: input } : { is: false };
    }
    return { is: true, val: input };
};
const cDefault = (input, expect = {}) => expect.default !== undefined && input === undefined ? { is: true, val: expect.default } : { is: true, val: input };
const cString = (val, expect) => {
    if (!cRequired(val, expect).is) return { is: false };
    if (expect.enum && !cEnum(val, expect).is) return { is: false };
    return typeof val === 'string' ? { is: true, val: String(val) } : { is: false };
};
const cNum = (val, expect) => {
    if (!cRequired(val, expect).is) return { is: false };
    if (expect.enum && !cEnum(Number(val), expect).is) return { is: false };
    return isNaN(Number(val)) || val === '' ? { is: false } : { is: true, val: Number(val) };
};
const cBool = (val, expect) => {
    if (!cRequired(val, expect).is) return { is: false };
    const cond = ramda_1.default.cond([[ramda_1.default.equals('true'), ramda_1.default.always({ is: true, val: true })], [ramda_1.default.equals('false'), ramda_1.default.always({ is: true, val: false })], [ramda_1.default.T, ramda_1.default.always({ is: typeof val === 'boolean', val })]]);
    return cond(val);
};
// /**
//  * 对 Object 做检验, 支持嵌套数据
// {
//   aaaa: 'hh',
//   bbbb: 'qq',
// }
// { // expect:
//   type: 'object',
//   properties: {
//     aaaa: { type: 'string', example: 'http://www.baidu.com', required: true },
//     bbbb: { type: 'string', example: 'Bob' }
//     c: { type: 'object', properties: {ii: {type: 'string'}, jj: {type: 'number'}} }
//   }
// }
//  */
const cObject = (input, expect = {}) => {
    if (!cRequired(input, expect).is) return { is: false };
    const res = { is: true, val: input };
    if (!is_type_of_1.default.object(input)) return { is: false };
    if (!expect.properties) return res;
    for (const key of Object.keys(expect.properties)) {
        // ignore empty key if not required
        if (!expect.properties[key].required && input[key] === undefined) {
            continue; // eslint-disable-line
        }
        const { is, val } = check(input[key], expect.properties[key]);
        if (!is) {
            console.log('error object properties:', key); // TODO need to update error debug info
            res.is = false;
            break;
        }
        input[key] = is ? val : input[key];
    }
    return res;
};
// {
//   type: 'array', required: true, items: 'string', example: ['填写内容']
// }
const cArray = (input, expect) => {
    if (!cRequired(input, expect).is) return { is: false };
    const res = { is: true, val: input };
    if (!Array.isArray(input)) {
        return { is: false };
    }
    if (!expect.items) {
        return res;
    }
    // items 字段为一个对象的情况, 验证该对象内的字段
    if (is_type_of_1.default.object(expect.items)) {
        for (const item of input) {
            const { is } = check(item, expect.items);
            if (!is) {
                res.is = false;
                return res;
            }
        }
    }
    // items 字段为字符串的情况: array 中的内容是基本类型, 或者为object|array类型但不需要校验内部字段
    if (is_type_of_1.default.string(expect.items)) {
        const check = func => () => input.length === input.filter(item => func(item)).length;
        const cond = ramda_1.default.cond([[ramda_1.default.equals('string'), check(is_type_of_1.default.string)], [ramda_1.default.equals('boolean'), check(is_type_of_1.default.boolean)], [ramda_1.default.equals('number'), check(is_type_of_1.default.number)], [ramda_1.default.equals('object'), check(is_type_of_1.default.object)], [ramda_1.default.equals('array'), check(is_type_of_1.default.array)], [ramda_1.default.T, true]]);
        return { is: cond(expect.items), val: input };
    }
    return res;
};
const check = (input, expect) => {
    // 添加对body参数 nullable 情况的支持
    const r = cNullable(input, expect);
    if (r.is === true) return r;
    const cond = ramda_1.default.cond([[ramda_1.default.equals('string'), () => cString(input, expect)], [ramda_1.default.equals('boolean'), () => cBool(input, expect)], [ramda_1.default.equals('number'), () => cNum(input, expect)], [ramda_1.default.equals('object'), () => cObject(input, expect)], [ramda_1.default.equals('array'), () => cArray(input, expect)], [ramda_1.default.T, () => ({ is: true, val: input })] // 其他类型不做校验，直接返回原数据
    ]);
    return cond(expect.type);
};
const Checker = {
    required: cRequired,
    object: cObject,
    string: cString,
    num: cNum,
    bool: cBool,
    default: cDefault,
    array: cArray,
    check
};
exports.default = Checker;