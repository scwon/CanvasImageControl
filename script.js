window.addEventListener("load", () => {

})

let img;

// 샘플 이미지 선택
const imageRenderer = document.getElementById("imageRenderer");
document.getElementById("imageSelector").addEventListener("click", (e) => {
    if(e.target.className === "sample"){
        const path = e.target.getAttribute("path");
        imageRenderer.innerHTML = `<img id="previewImage" src="${path}"/>`
        img = path;
    }
})

// 원하는 이미지 업로드
const fileInput = document.getElementById("uploadInput");
document.getElementById("upload").addEventListener("click", (e) => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const imageFile = fileInput.files[0];

    if(imageFile){
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            imageRenderer.innerHTML = `<img id="previewImage" src="${reader.result}"/>`
            img = reader.result;
        }
    }
})

const canvasRenderer = document.getElementById("canvasRenderer");
document.getElementById("close").addEventListener("click", () => {
    canvasRenderer.style.display = "none"; 
});
document.getElementById("mosaic").addEventListener("click", () => {
    console.log("img ==", img);
    if(img){
        canvasRenderer.style.display = "flex";
        new Mosaic(img);
    }
})