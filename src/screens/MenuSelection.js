import { el } from "redom";
import { HorizontalNavTabs } from "../components/HorizontalNavTabs";


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
    return el("div", [
        el("p", "Use an image as a template to generate a terrain"),
        el("div", [
            el("input.form-control mt-1", { type: "file", id: "terrain-image", accept: ".jpg, .jpeg, .png" }),
            el("button.mt-1 btn btn-primary form-contro", {
                id: "generate-terrain-from-image-btn",
                name: "image",
                type: "file",
                textContent: "Select Image"
            })
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