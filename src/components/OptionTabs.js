import { FileTab } from "./FileTab";


export function OptionTabs() {
    const file = new FileTab({visible: true, clickable: false});
    const target = document.getElementById("option-tabs");
    target.insertAdjacentHTML("beforeend", file.code);
}