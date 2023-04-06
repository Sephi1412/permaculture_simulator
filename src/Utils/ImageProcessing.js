import { el } from "redom";
import { VARS } from "../core/Global";



export function loadImageFromInputField() {

    /* 
        1) Load an image
        2) Rescale it so is not too big
        3) Force it so it's dimensions are multiples of 16
    */
    let imgFile = document.getElementById('terrain-image').files[0];
    let reader = new FileReader();
    let image = new Image();

    let canvas = document.createElement('canvas');
    canvas.style.display = "none"
    document.body.appendChild(canvas);
    let context = canvas.getContext('2d');

    reader.readAsDataURL(imgFile);

    reader.onload = function (e) {
        image.src = reader.result;
        image.onload = function () {
            resizeImg({ context, canvas, image })
        }
    }
}


function resizeImg({ context, canvas, image }) {
    let imgWidth = image.width;
    let imgHeight = image.height;
    let segmentsPerTile = VARS.SEGMENTS_PER_TILE;
    // let widthFragments, widthSegments = 1;
    // let heightFragments, heightSegments = 1;


    if (imgWidth >= imgHeight) {
        if (imgWidth > VARS.MAX_IMG_SIZE) {
            imgHeight = parseInt(imgHeight * (VARS.MAX_IMG_SIZE / imgWidth));
            imgHeight -= imgHeight % 16;
            imgWidth = VARS.MAX_IMG_SIZE + (VARS.MAX_IMG_SIZE) % 16;
        }

    } else {
        if (imgHeight > VARS.MAX_IMG_SIZE) {
            imgWidth = parseInt(imgWidth * (VARS.MAX_IMG_SIZE / imgHeight));
            imgWidth -= imgWidth % 16
            imgHeight = VARS.MAX_IMG_SIZE + (VARS.MAX_IMG_SIZE % 16);
        }
    }

    canvas.width = imgWidth;
    canvas.height = imgHeight;


    context.drawImage(image, 0, 0, imgWidth, imgHeight);

    console.log(context);

    let sx = 0;
    let sy = 0;
    let sw = 128;
    let sh = 128;
    const tile = context.getImageData(64, 0, 64, 64);
    const imgContainer = document.getElementById("test-image");
    // const tile = context.getImageData(0, 0, 15, 15);
    // imgContainer.width = imgWidth;
    // imgContainer.height = imgHeight;
    // imgContainer.src = canvas.toDataURL();

    let tileCanvas = document.createElement('canvas');
    tileCanvas.style.display = "none"
    document.body.appendChild(tileCanvas);

    let tileContext = tileCanvas.getContext('2d');
    tileContext.putImageData(tile, 0, 0)

    console.log(imgWidth, imgHeight, tile);
    imgContainer.width = imgWidth;
    imgContainer.height = imgHeight / 2;
    imgContainer.src = tileCanvas.toDataURL();



    // for(let j = 0; j < nHeightTiles; j++) {
    //     for(let i = 0; i < nWidthTiles; i++) {

    //         const sx = (segmentsPerTile * i);
    //         const sw = (segmentsPerTile * (i+ 1));
    //         const sy = (segmentsPerTile * j);
    //         const sh = (segmentsPerTile * (j+ 1));
    //         tileData.push(context.getImageData(sx, sy, sw, sh));
    //     }
    // }
    // // console.log(tileData);
    // // console.log(canvas.toDataURL());
    // const imgContainer = document.getElementById("test-image");
    // let tileCanvas = document.createElement('canvas');
    // tileCanvas.style.display = "none"
    // document.body.appendChild(tileCanvas);

    // let tileContext = tileCanvas.getContext('2d');
    // tileContext.putImageData(tileData[2], 0, 0)


    // imgContainer.width = tileData[2].width;
    // imgContainer.height = tileData[2].height;
    // imgContainer.src = tileCanvas.toDataURL();
}



