import { Input } from "./Input";
import { el, mount } from "redom";

export class TextInput extends Input {
    constructor({ id, containerID, label, props, callbacks }) {
        /*
            Rows, placeholder
        */
        const labelProps = { textContent: label }
        super({ id: id, containerID: containerID, callbacks: callbacks, labelProps: labelProps });

        this.props = {
            id: id,
            type: "text",
            class: "form-control",
            placeholder: props.placeholder
        };

        this.createInput();
        this.createLabel();
        this.render();
    }

    createInput() {
        this.input = el(`input`, this.props);
        this.inputContainer = el('div.mt-3', [this.input]);
        this.setInputEventListeners();
    }

    render() {
        this.el = el("div.container d-flex flex-column mt-3", [
            this.label,
            this.inputContainer,
        ])

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