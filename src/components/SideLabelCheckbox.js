import { Input } from './Input';
import { el, mount } from 'redom';

export class SideLabelCheckbox extends Input {
	constructor({ id, containerID, label, checked = false, callbacks }) {
		const labelProps = { textContent: label };
		super({ id: id, containerID: containerID, callbacks: callbacks, labelProps: labelProps });
		this.checked = checked;
		this.render();
	}

	createLabel() {
		this.label = el('div. side-input-label d-flex ms-1', { textContent: this.labelProps.textContent });
	}

	createInput() {
		this.input = el(`input.form-check-input px-2`, { type: 'checkbox', id: this.id, checked: this.checked });
	}

	createElement() {
		this.el = el('div.container row mt-3', [ el('div.col-8', [ this.label ]), el('div.col-4', [ this.input ]) ]);
	}

	handleUpdate(event) {
		this.currentVal = event.srcElement.checked;
		this.useCallbacks({ event: event, value: this.currentVal });
	}
}
