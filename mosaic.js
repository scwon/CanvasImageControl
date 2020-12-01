const mosaicSize = 4;

class Mosaic {
    imgDom;
    canvas = document.createElement("canvas");
    effectCanvas = document.createElement("canvas");
    effectCtx;
    ctx;
    width = 0;
    height = 0;
    constructor(img){
        this.imgDom = document.getElementById("previewImage");
        const wrapper = document.getElementById("canvasWrapper");
        this.img = img;
        const oriWidth = this.imgDom.clientWidth;
        const oriHeight = this.imgDom.clientHeight;
        let width = oriWidth;
        let height = oriHeight;

        if(height > width){
            const maxHeight = window.innerHeight - 50;
            if(height > maxHeight) height = maxHeight;
            if(height < 100) height = 100;
            const per = height / oriHeight;
            width = Math.round(per * oriWidth);
        }else{
            const maxWidth = window.innerWidth - 50;
            if(width > maxWidth) width = maxWidth;
            if(width < 100) width = 100;
            const per = width / oriWidth;
            height = Math.round(per * oriHeight);
        }

        this.width = width;
        this.height = height;

        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.canvas.width = width;
        this.canvas.height = height;
        this.effectCanvas.width = width;
        this.effectCanvas.height = height;

        this.ctx = this.canvas.getContext("2d");
        this.effectCtx = this.effectCanvas.getContext("2d");

        wrapper.innerHTML = "";
        wrapper.appendChild(this.canvas);
        this.canvas.addEventListener("mousemove", this.mouseMoveEvent);
        
        this.draw();
    }

    draw = () => {
        const { ctx, imgDom } = this;
        ctx.drawImage(imgDom, 0, 0, this.width, this.height);
        ctx.drawImage(this.effectCanvas, 0, 0, this.width, this.height);
        // const imageData = ctx.getImageData(0, 0, 1, 2);
        // imageData.data.forEach((d) => {
        //     console.log("d ==", d);
        // })
    }

    mouseMoveEvent = (e) => {
        const x = e.layerX - mosaicSize / 2;
        const y = e.layerY - mosaicSize / 2;
        const imageData = this.ctx.getImageData(x, y, mosaicSize, mosaicSize);
        let sum = [0, 0, 0, 0]; // rgba
        const length = imageData.data.length / 4;
        imageData.data.forEach((d, i) => {
            const idx = (i % 4);
            sum[idx] += d;
        });

        const color = `rgba(${sum.map((s, i) => Math.round(s / length)).join(",")})`
        this.effectCtx.fillStyle = color;
        this.effectCtx.fillRect(x, y, mosaicSize, mosaicSize);
        this.draw();
    }
}