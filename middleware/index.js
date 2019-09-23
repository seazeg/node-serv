"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./decorators"));
const wrapper_1 = require("./wrapper");
exports.wrapper = wrapper_1.wrapper;
exports.SwaggerRouter = wrapper_1.SwaggerRouter;
__export(require("./swaggerPropertyHelper"));