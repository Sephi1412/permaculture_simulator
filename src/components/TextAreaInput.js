import { Input } from "./Input";
import { el, mount } from "redom";

export class TextAreaInput extends Input {
    constructor({ id, containerID, label, props, callbacks }) {
        /*
            Rows, placeholder
        */
        const labelProps = { textContent: label }
        super({ id: id, containerID: containerID, callbacks: callbacks, labelProps: labelProps });
        this.props = props

        this.createInput();
        this.createLabel();
        this.render();
    }

    createInput() {
        this.input = el(`textarea.form-control`, this.props);
        this.inputContainer = el('div.mt-3', [this.input]);
        this.setInputEventListeners();
    }

    render() {
        this.el = el("div.container d-flex flex-column mt-3", [
            this.label,
            this.inputContainer,
        ]);

        if (this.containerID) {
            const containerEl = document.getElementById(this.containerID);
            mount(containerEl, this.el);
        }
    }

    handleUpdate(event) {
        this.currentVal = event.srcElement.value;
        this.useCallbacks({ event: event, value: this.currentVal });
    }
}