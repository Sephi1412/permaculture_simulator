import { Input } from "./Input";
import { el, mount } from "redom";

export class RangeInput extends Input {
    constructor({ id, containerID, props, label, containerProps, callbacks }) {
        const inputClass = "form-range";
        const inputProps = {
            id: id,
            type: "range",
            min: props.min,
            max: props.max,
            value: props.currentValue,
            step: props.step,

        };

        const labelProps = { textContent: label }
        super({ id, containerID, containerProps, labelProps, inputClass, inputProps, callbacks, inputClass });

        this.createInput();
        this.createLabel();
        this.render();


    }

    createInput() {
        this.input = el(`input.form-range`, this.inputProps);
        this.display = el("input.form-control range-display", {
            type: "text",
            value: this.value,
            step: this.inputProps.step,
            disabled: true,
        });
        this.inputContainer = el("div.row", [
            el("div.col-8 align-items-center justify-content-center d-flex", [this.input]),
            el("div.col-4 align-items-center justify-content-center d-flex", [this.display])
        ])

        this.setInputEventListeners();
    }

    render() {
        const containerEl = document.getElementById(this.containerID);
        this.el = el("div.container d-flex flex-column", [
            this.label,
            el("div.row", [
                el("div.col-8 align-items-center justify-content-center d-flex", [this.input]),
                el("div.col-4 align-items-center justify-content-center d-flex", [this.display])
            ])
        ])

        mount(containerEl, this.el);
    }


    handleUpdate(event) {
        this.currentVal = parseFloat(event.srcElement.value);
        this.display.value = this.currentVal;
        this.useCallbacks({ event: event, value: this.currentVal });
    }
}