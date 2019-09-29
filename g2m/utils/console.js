const colors = require('colors');

colors.setTheme({
    info: 'green',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

module.exports = {
    error() {
        let arr = Array.prototype.slice.call(arguments);
        this.__log('error', arr);
    },
    warn() {
        let arr = Array.prototype.slice.call(arguments);
        this.__log('warn', arr);
    },
    info() {
        let arr = Array.prototype.slice.call(arguments);
        this.__log('info', arr);
    },
    debug() {
        let arr = Array.prototype.slice.call(arguments);
        this.__log('debug', arr);
    },
    __log(type, arr) {
        let temp = [];
        switch (type) {
            case 'error':
                for (let i of arr) {
                    if (i instanceof Object) {
                        if (i instanceof Error) {
                            temp.push(i);
                        } else {
                            i = JSON.stringify(i)
                            temp.push(i.error);
                        }
                    } else {
                        temp.push(i.error);
                    }
                };
                break;
            case 'warn':
                for (let i of arr) {
                    if (i instanceof Object) {
                        if (i instanceof Error) {
                            temp.push(i);
                        } else {
                            i = JSON.stringify(i)
                            temp.push(i.warn);
                        }
                    } else {
                        temp.push(i.warn);
                    }
                };
                break;
            case 'info':
                for (let i of arr) {
                    if (i instanceof Object) {
                        if (i instanceof Error) {
                            temp.push(i);
                        } else {
                            i = JSON.stringify(i)
                            temp.push(i.info);
                        }
                    } else {
                        temp.push(i.info);
                    }
                };
                break;
            case 'debug':
                for (let i of arr) {
                    if (i instanceof Object) {
                        if (i instanceof Error) {
                            temp.push(i);
                        } else {
                            i = JSON.stringify(i)
                            temp.push(i.debug);
                        }
                    } else {
                        temp.push(i.debug);
                    }
                };
                break;
            default:
                break;
        }
        console.log.apply(console, temp);
    }
}