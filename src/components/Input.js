import { el, mount } from "redom";
import onChange from 'on-change';

export class Input {
    constructor(id, containerID, containerProps = {}, labelProps = {}, inputClass = "", inputProps = {}, callbacks = {}) {
        /*
            Container Props: Mainly related to style
            Label Props: Mainly related to style. Also contains the label string
            inputProps: Class, Type, min, max, current, etc.
            callbacks: Object that contains different type of functions. The key
            associated to each function is the type of event that should activate it.

        */
        this.id = id;
        this.containerID = containerID;
        this.inputClass = inputClass;
        this.inputProps = inputProps;
        this.labelProps = labelProps;
        this.containerProps = containerProps;
        this.value = inputProps.value;
        this.callbacks = callbacks;

    }

    createInput() {
        this.input = el(`input.${this.inputClass}`, this.inputProps);
        this.inputContainer = el("div.container", this.input);
        this.input.addEventListener("change", (event) => this.handleUpdate(event))
    }

    createLabel() {
        this.label = el("div.input-label w-50 justify-content-center d-flex", { textContent: "HELLO WORLD" })
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
        this.currentVal = event.srcElement.value;
        this.useCallbacks(event);
    }

    useCallbacks(props) {
        const event = props.event;
        const eventCallback = this.callbacks[event.type];
        eventCallback(props);
    }

}

