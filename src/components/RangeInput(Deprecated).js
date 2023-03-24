import { el, mount } from "redom";
import onChange from 'on-change';

export class RangeInputDepr {
    constructor({ id, container, onChangeCallback, label, defaultValue = 0.0, minVal = 0.0, maxVal = 2.0, step = 0.5 }) {
        this.id = id;
        this.step = step;
        this.label = label;
        this.maxVal = maxVal;
        this.minVal = minVal;
        this.container = container;
        this.currentVal = defaultValue;
        this.onChangeCallback = onChangeCallback;

        this._init()
        this.render();
    }

    _init() {
        this.input = el("input.form-range", {
            type: "range",
            min: this.minVal,
            max: this.maxVal,
            value: this.currentVal,
            step: this.step,
            id: this.id
        });

        this.display = el("input.form-control range-display", {
            type: "text",
            value: this.currentVal,
            step: this.step,
        });

        this.inputContainer = el("div.row", [
            el("div.col-8 align-items-center justify-content-center d-flex", [this.input]),
            el("div.col-4 align-items-center justify-content-center d-flex", [this.display])
        ])

        this.label = el("div.input-label w-50 justify-content-center d-flex", { textContent: this.label })
        this.input.addEventListener("change", (event) => this.handleChange(event))


        // return this.input;
    }

    render() {
        const containerEl = document.getElementById(this.container)
        this.el = el("div.container d-flex flex-column", [
            this.label,
            el("div.row", [
                el("div.col-8 align-items-center justify-content-center d-flex", [this.input]),
                el("div.col-4 align-items-center justify-content-center d-flex", [this.display])
            ])
        ])

        mount(containerEl, this.el);
    }

    handleChange(event) {
        // const eventType = event.type;
        this.currentVal = parseFloat(event.srcElement.value);
        this.display.value = this.currentVal;
        console.log(event.type);
        this.onChangeCallback("currentValue", this.currentVal);
    }
}

