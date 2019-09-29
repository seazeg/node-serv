"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "name": "dev-server",
    "cwd": "/Users/geng/Project/Person/node-work/app/dist",
    "log_date_format": "YYYY-MM-DD HH:mm Z",
    "error_file": "/Users/geng/Project/Person/node-work/logs/sys-env/node-app.stderr.log",
    "out_file": "/Users/geng/Project/Person/node-work/logs/sys-env/node-app.stdout.log",
    "pid_file": "/Users/geng/Project/Person/node-work/logs/sys-env/node-geo-api.pid",
    "min_uptime": "200s",
    "max_restarts": 10,
    "max_memory_restart": "1M",
    "watch": ["src", "lib"],
    "ignore_watch": ["node_modules", "logs"],
    "merge_logs": true,
    "instances": 2,
    "exec_mode": "cluster",
    "env": {
        "NODE_ENV": "dev",
        "PORT": 5257,
        "PROJECT_PATH": "/Users/geng/Project/Person/node-work/app/dist",
        "LOGGER_PATH": "/Users/geng/Project/Person/node-work/logs/%DATE%"
    }
};