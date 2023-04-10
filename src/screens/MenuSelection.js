import { el } from "redom";
import { HorizontalNavTabs } from "../components/HorizontalNavTabs";
import { Game } from "../core/Game";
import { VARS } from "../core/Global";
import { generateTilesFromImage, loadImageFromInputField } from "../Utils/ImageProcessing";


export function generateMainMenu() {
    const gameContainer = document.getElementById("game-container");
    const mainMenuSelector = new HorizontalNavTabs({ id: "main-menu-selector" })

    /* Generate First Option */
    const firstOption = optionGenerateFromImage();
    const secondOption = optionGenerateSimplePlane();

    mainMenuSelector.addNewItem({ tabID: "generate-from-image", label: "Generate From Image", contents: firstOption, isActive: true })
    mainMenuSelector.addNewItem({ tabID: "generate-as-plane", label: "Generate a Basic Plane", contents: secondOption })
    mainMenuSelector.render();

    mainMenuSelector.setParent(gameContainer);
}



function optionGenerateFromImage() {
    const button = el("button.mt-1 btn btn-primary form-contro", {
        id: "generate-terrain-from-image-btn",
        name: "image",
        type: "file",
        textContent: "Select Image"
    });

    button.addEventListener("click", event => handleImageSelection())

    return el("div", [
        el("p", "Use an image as a template to generate a terrain"),
        el("div", [
            el("input.form-control mt-1", { type: "file", id: "terrain-image", accept: ".jpg, .jpeg, .png" }),
            button
        ])
    ])
}


function optionGenerateSimplePlane() {
    const dimensionForm = el("div.row g-3", [
        el("div.col-auto", el("input.form-control", {
            type: "number",
            id: "plane-width",
            value: 128,
            placeholder: "Width",
        })),
        el("div.col-auto", el("input.form-control", {
            type: "number",
            id: "plane-height",
            value: 128,
            placeholder: "Height",
        })),
        el("div.col-auto", el("button.btn btn-primary", {
            id: "generate-plane-btn",
            name: "plane",
            textContent: "Create Plane"
        }))
    ])

    return el("div", [
        el("p", "Create a simple plane that can be modified in this application"),
        dimensionForm,
    ])
}

function handleImageSelection() {
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
            const tiles = generateTilesFromImage({ context, canvas, image })
            const menuData = {
                generationType: "img",
                data: tiles,
            }
            VARS.GAME = new Game({ mode: "FREE_MODE", menuSelectionData: menuData });
        }
    }
    
}