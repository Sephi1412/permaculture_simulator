import { Input } from './Input';
import { el, mount } from 'redom';

export class RangeInput extends Input {
	constructor({ id, parent, props, label, containerProps, callbacks }) {
		const inputProps = {
			id: id,
			type: 'range',
			min: props.min,
			max: props.max,
			value: props.currentValue,
			step: props.step
		};

		const labelProps = { textContent: label };
		super({ id, parent, containerProps, labelProps, inputProps, callbacks });

		this.render();
	}

	createElement() {
		this.el = el('div.container d-flex flex-column', [ this.label, this.inputContainer ]);
	}

	createInput() {
		this.input = el(`input.form-range`, this.inputProps);
		this.display = el('input.form-control form-control-sm range-display', {
			type: 'text',
			value: this.value,
			step: this.inputProps.step,
			disabled: true
		});
		this.inputContainer = el('div.row mt-2 ', [
			el('div.col-9 range-container align-items-center justify-content-center d-flex', [ this.input ]),
			el('div.col-3 align-items-center justify-content-center d-flex', [ this.display ])
		]);
	}

	handleUpdate(event) {
		this.currentVal = parseFloat(event.srcElement.value);
		this.display.value = this.currentVal;
		this.useCallbacks({ event: event, value: this.currentVal });
	}
}
