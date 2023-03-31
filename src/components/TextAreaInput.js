import { Input } from './Input';
import { el, mount } from 'redom';

export class TextAreaInput extends Input {
	constructor({ id, parent, label, props, callbacks }) {
		/*
            Rows, placeholder
        */
		const labelProps = { textContent: label };
		super({ id: id, parent: parent, callbacks: callbacks, labelProps: labelProps });
		this.props = props;

		this.render();
	}

	createElement() {
		this.el = el('div.container d-flex flex-column mt-3', [ this.label, this.inputContainer ]);
	}

	createInput() {
		this.input = el(`textarea.form-control`, this.props);
		this.inputContainer = el('div', [ this.input ]);
	}
}
