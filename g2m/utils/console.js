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
    __log(type, arr) {
        let temp = [];
        switch (type) {
            case 'error':
                for (let i of arr) {
                    console.log(i);
                    typeof i === 'object' ? i = JSON.stringify(i) : i
                    temp.push(i.error)
                };
                break;
            case 'warn':
                for (let i of arr) {
                    typeof i === 'object'  ? i = JSON.stringify(i) : i
                    temp.push(i.warn)
                };
                break;
            case 'info':
                for (let i of arr) {
                    typeof i === 'object'  ? i = JSON.stringify(i) : i
                    temp.push(i.info)
                };
                break;
            default:
                break;
        }
        console.log.apply(console, temp);
    }
}