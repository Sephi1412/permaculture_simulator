import { Input } from "./Input";
import { el, mount } from "redom";

export class SelectInput extends Input {
    constructor({ id, containerID, defaultValue, options, label, callbacks }) {
        const labelProps = { textContent: label }
        super({ id: id, containerID: containerID, callbacks: callbacks, labelProps: labelProps, inputProps: options });
        this.defaultValue = defaultValue;

        this.createInput();
        this.createLabel();
        this.render();
    }

    createInput() {
        const values = Object.keys(this.inputProps);
        let options = [el("option", { selected: true, textContent: this.defaultValue })];

        values.forEach(value => {
            options.push(el("option", { value: value, textContent: this.inputProps[value] }))
        });

        this.input = el(`select.form-select`, options);
        this.input.addEventListener("change", (event) => this.handleUpdate(event))
        this.inputContainer = el("div.mt-3", [this.input])
    }
}