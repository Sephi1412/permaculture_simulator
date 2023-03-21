// import $ from "jquery";

import { VARS } from "./Global";



export function testEventListeners() {
    const testButton = document.getElementById("test-modal-change");
    testButton.addEventListener("click", () => {
        const target = VARS.MENUS["decision-modal"];
        target.setTitle("Hello World");
        target.show();
        // console.log("AAAAAAAAAAA")
        // setTitle("Updated Title");
        // setBody("Updated Body");
        // $('#decision-modal').modal('show');
        // console.log();

    })
    // // const target = document.getElementById("offcanvasRight");
    // decisionModal.addEventListener("show.bs.modal", () => setOnOpenCallback())
    // decisionModal.addEventListener("hidden.bs.offcanvas", () => alert("CERRADO"))

    // decisionModal.addEventListener("show.bs.modal", () => alert("ABIERTO"))
    // decisionModal.addEventListener("hidden.bs.modal", () => alert("CERRADO"))
}