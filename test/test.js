const request = require('request');

describe('screenshot', function () {
    it('a test', function () {
        return new Promise(function (resolve) {
            request('localhost:3000/api/screenshot?hostName=www.haier.com', {
                timeout: 100000
            }, function (err, res, body) {
              setTimeout(() => {
                  console.log(res);
                  resolve(res);
              }, 6000);
                
            });
        }).then(function (res) {
            expect(res.statusCode).toBe(200);
        });
    });
});