import { Input } from './Input';
import { el, mount } from 'redom';

export class TextInput extends Input {
	constructor({ id, parent, label, props, callbacks }) {
		/*
            Rows, placeholder
        */
		const labelProps = { textContent: label };
		super({ id: id, parent: parent, callbacks: callbacks, labelProps: labelProps });

		this.props = {
			id: id,
			type: 'text',
			class: 'form-control',
			placeholder: props.placeholder
		};

		this.render();
	}

	createInput() {
		this.input = el(`input`, this.props);
		this.inputContainer = el('div.mt-3', [ this.input ]);
	}

    createElement() {
        this.el = el('div.container d-flex flex-column mt-3', [ this.label, this.inputContainer ]);
    }

}
