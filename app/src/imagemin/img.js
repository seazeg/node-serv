const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');


console.time();
(async () => {
   
    const files = imagemin(['images/*.{jpg,png}'], {
        destination: 'build/',
        plugins: [
            imageminJpegtran({
                quality: 10
            }),
            imageminMozjpeg({
                quality: 60
            }),
            imageminPngquant({
                speed: 1,
                // strip: true,
                // quality:[0.5, 0.7],
                // dithering: 0
            })
        ]
    });
    files.then(function(){
        console.timeEnd();
    })
})();
