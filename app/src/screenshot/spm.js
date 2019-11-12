export default async function spmDrawing(page, spmC, isAnnotated) {
    page.evaluate((spmC, isAnnotated) => {
        const cObj = document.querySelector(`[spm-c="${spmC}"]`)
        cObj.style.cssText = "border: 2px solid red;";
        if (isAnnotated) {
            //移动端适配
            if (window.innerWidth <= 1200) {
                if (spmC.includes('header')) {
                    document.querySelector('.js_m_menu').click()
                    cObj.click();
                }
            } else {
                if (spmC.includes('header')) {
                    cObj.classList.add("cur");
                }
            }

            for (let i = 0; i <= cObj.querySelectorAll('[spm-d]').length + 1; i++) {
                let sdl = cObj.querySelectorAll(`[spm-d="${i}"]`)
                let temp;
                for (let item of sdl) {
                    item.style.cssText = "display:inline-block;border:2px solid red;position:relative;"

                    temp = `<div style="position: absolute;display: block;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;color:red;background: rgba(255,255,255,0.1);z-index:10000;font-size:30px;text-align:center;">${i}</div>`;

                    item.insertAdjacentHTML('beforeEnd', temp);
                }

            }
        }
    }, spmC, isAnnotated);
}