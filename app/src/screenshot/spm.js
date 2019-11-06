export default async function spmDrawing(page, spmC, isAnnotated) {
    page.evaluate((spmC, isAnnotated) => {
        const cObj = document.querySelector(`[spm-c="${spmC}"]`)
        cObj.style.cssText = "border: 2px solid red;";
        if (isAnnotated) {
            let num = cObj.querySelectorAll('[spm-d]').length
            if (spmC.includes('header')) {
                cObj.classList.add("cur");
            }
            for (let i = 0; i <= num; i++) {
                // 对D进行加红框操作
                let sdl = cObj.querySelectorAll(`[spm-d="${i}"]`)
                let temp;
                for(let item of sdl){
                    item.style.cssText = "display:inline-block;border:2px solid red;position:relative;"

                    // 对D所在的标签添加遮罩层，再添加数据
                    temp = `<div style="position: absolute;display: block;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;color:red;background: rgba(255,255,255,0.1);z-index:10000;font-size:32px;text-align:center;"><span style="color:red;position: absolute;background: rgba(255,255,255,0.1);top: 0;left: 0;right: 0;bottom: 0;z-index:10002;">${i}</span></div>`;
    
                    item.insertAdjacentHTML('beforeEnd', temp);
                }
                
            }
        }
    }, spmC, isAnnotated);
}