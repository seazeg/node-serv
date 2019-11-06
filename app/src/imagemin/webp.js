const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

(async () => {
    imagemin(['images/*.{jpg,png}'], {
        destination: 'build/',
        plugins: [
            imageminWebp()
        ]
    });
})();