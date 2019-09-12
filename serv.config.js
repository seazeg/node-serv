module.exports = {
    apps: [{
        name: "prod-server",
        script: "./server/index.js",
        env: {
            "NODE_ENV": "pro",
            "PORT": 3000
        }
    }, {
        name: "dev-server",
        script: "./server/index.js",
        env: {
            "NODE_ENV": "dev",
            "PORT": 3000
        }
    }]
}