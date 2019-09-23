"use strict";

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
const check_1 = __importDefault(require("./check"));
let InputError = class InputError extends Error {
    constructor(field) {
        super(`incorrect field: '${field}', please check again!`);
        this.field = field;
        this.status = 400;
    }
};

function default_1(rawInput, expect) {
    // make it pure
    const input = ramda_1.default.clone(rawInput);
    Object.keys(expect).forEach(key => {
        if (expect[key] === undefined) {
            delete input[key]; // remove unexpected key/vals.
            return;
        }
        // if this key is required but not in input.
        if (!check_1.default.required(input[key], expect[key]).is) {
            throw new InputError(key);
        }
        // if this key has default value
        const defaultVal = check_1.default.default(input[key], expect[key]).val;
        // only set default value when it is not undefined
        // avoid side effect of undefined default value
        if (defaultVal !== undefined) {
            input[key] = defaultVal;
        }
        if (input[key] === undefined) return;
        const { is, val } = check_1.default.check(input[key], expect[key]);
        if (!is) throw new InputError(key);
        input[key] = val;
    });
    return input;
}
exports.default = default_1;