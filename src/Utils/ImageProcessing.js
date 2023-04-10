import { el } from "redom";
import { VARS } from "../core/Global";

export function generateTilesFromImage({ context, canvas, image }) {
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

    let nWidthTiles = imgWidth / segmentsPerTile;
    let nHeightTiles = imgHeight / segmentsPerTile;

    let sx = 0;
    let sy = 0;
    let sw = 128;
    let sh = 128;
    // const tile = context.getImageData(segmentsPerTile * (nWidthTiles - 1), segmentsPerTile * (nHeightTiles - 1), segmentsPerTile, segmentsPerTile);
    const imgContainer = document.getElementById("test-image");
    // const tile = context.getImageData(0, 0, 15, 15);
    // imgContainer.width = imgWidth;
    // imgContainer.height = imgHeight;
    // imgContainer.src = canvas.toDataURL();

    // let tileCanvas = document.createElement('canvas');
    // tileCanvas.style.display = "none"
    // document.body.appendChild(tileCanvas);

    // let tileContext = tileCanvas.getContext('2d');
    // tileContext.putImageData(tile, 0, 0)

    // console.log(imgWidth, imgHeight, tile);
    // imgContainer.width = imgWidth * 4;
    // imgContainer.height = imgHeight * 2;
    // imgContainer.src = tileCanvas.toDataURL();

    const tiles = [];

    for (let j = 0; j < nHeightTiles; j++) {
        for (let i = 0; i < nWidthTiles; i++) {

            const sx = segmentsPerTile * i;
            const sw = segmentsPerTile;
            const sy = segmentsPerTile * j;
            const sh = segmentsPerTile;
            const tileData = context.getImageData(sx, sy, sw, sh);
            tiles.push({
                imgData: tileData,
                column: i,
                row: j,
            });
        }
    }

    return {
        nWidthTiles: nWidthTiles,
        nHeightTiles: nHeightTiles,
        segmentsPerTile: segmentsPerTile,
        tiles: tiles,

    };
    // console.log(tiles);

    // let tileCanvas = document.createElement('canvas');
    // tileCanvas.style.display = "none"
    // document.body.appendChild(tileCanvas);

    // let tileContext = tileCanvas.getContext('2d');
    // console.log(tileData[0])
    // tileContext.putImageData(tileData[tileData.length - 1], 0, 0)

    // imgContainer.width = imgWidth * 4;
    // imgContainer.height = imgHeight * 2;
    // imgContainer.src = tileCanvas.toDataURL();
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



