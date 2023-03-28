import { Input } from "./Input";
import { el, mount } from "redom";

export class RangeInput extends Input {
    constructor({ id, containerID, props, label, containerProps, callbacks }) {
        const inputProps = {
            id: id,
            type: "range",
            min: props.min,
            max: props.max,
            value: props.currentValue,
            step: props.step,

        };

        const labelProps = { textContent: label }
        super({ id, containerID, containerProps, labelProps, inputProps, callbacks });

        this.createInput();
        this.createLabel();
        this.render();


    }

    createInput() {
        this.input = el(`input.form-range`, this.inputProps);
        this.display = el("input.form-control form-control-sm range-display", {
            type: "text",
            value: this.value,
            step: this.inputProps.step,
            disabled: true,
        });
        this.inputContainer = el("div.row mt-2 ", [
            el("div.col-9 range-container align-items-center justify-content-center d-flex", [this.input]),
            el("div.col-3 align-items-center justify-content-center d-flex", [this.display])
        ])

        this.setInputEventListeners();
    }

    render() {
        this.el = el("div.container d-flex flex-column", [
            this.label,
            this.inputContainer
        ])
        if (this.containerID) {
            const containerEl = document.getElementById(this.containerID);
            mount(containerEl, this.el);
        }

    }


    handleUpdate(event) {
        this.currentVal = parseFloat(event.srcElement.value);
        this.display.value = this.currentVal;
        this.useCallbacks({ event: event, value: this.currentVal });
    }
}