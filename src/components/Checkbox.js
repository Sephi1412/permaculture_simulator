import { Input } from './Input';
import { el, mount } from 'redom';

export class Checkbox extends Input {
	constructor({ id, containerID, label, checked = false, callbacks }) {
		const labelProps = { textContent: label };
		super({ id: id, containerID: containerID, callbacks: callbacks, labelProps: labelProps });
		this.checked = checked;
		this.render();
	}

	createElement() {
		this.el = el('div.container row mt-3', [ el('div.col-10', [ this.label ]), el('div.col-2', [ this.input ]) ]);
	}

	createInput() {
		this.input = el(`input.form-check-input`, { type: 'checkbox', id: this.id, checked: this.checked });
	}

	handleUpdate(event) {
		this.currentVal = event.srcElement.checked;
		this.useCallbacks({ event: event, value: this.currentVal });
	}
}
