import { el, mount, setChildren } from 'redom';
import { Component } from './Component';

export class Dropdown extends Component {
	constructor({ id, parent, children = [], label = 'Dropdown Button' }) {
		super({ componentID: id });
		if (parent) this.parent = parent;
		this.children = children;
		this.label = label;
		this.render();
	}

	generateDropdownButton() {
		this.dropdownBtn = el(`button.btn active-btn`, {
			type: 'button',
			'data-bs-toggle': 'dropdown',
			'aria-expanded': 'false',
			textContent: this.label
		});
	}

	generateComponent() {
		this.generateDropdownButton();
		this.optionContainer = el(`ul.dropdown-menu w-25`);
		this.el = el(`div#${this.id}`, [ this.dropdownBtn, this.optionContainer ]);
	}

	addItemWithCheckbox({ label, onClickCallback, checked }) {
		const childrenId = `${this.id}-item-${this.n_children}`;
		const item = new DropdownOption({
			label: label,
			type: 'checkbox',
			id: childrenId,
			callbacks: { click: () => onClickCallback() },
			checked: checked
		});
		this.optionContainer.appendChild(item.el);
		this.n_children += 1;
	}

	addClickableItem({ label, callbacks, toggle = '', target = '' }) {
		const childrenId = `${this.id}-item-${this.n_children}`;
		const item = new DropdownOption({
			label: label,
			type: 'clickable',
			id: childrenId,
			callbacks: callbacks,
			toggle: toggle,
			target: target
		});
		this.optionContainer.appendChild(item.el);
		this.n_children += 1;
	}

	addOption({ label, callbacks, type = 'clickable', toggle = '', target = '' }) {}
}

class DropdownOption extends Component {
	constructor({ label = '', type = 'clickable', id, callbacks = {}, toggle = '', target = '', checked = false }) {
		/* types: "clickable, checkbox" */
		super({ componentID: id });
		this.type = type;
		this.label = label;
		this.checked = checked;
		this.dataToggle = toggle;
		this.dataTarget = target;
		this.callbacks = callbacks;

		this.render();
	}

	generateComponent() {
		// const item = el('li', [ el(`a.dropdown-item`, label) ]);
		switch (this.type) {
			case 'clickable':
				this.el = el('li', [
					el(`a.dropdown-item#${this.id}`, this.label),
					{ 'data-bs-toggle': this.dataToggle, 'data-bs-target': `#${this.dataTarget}` }
				]);
				break;

			case 'checkbox':
				const checkbox = el(`input.form-check-input`, {
					type: 'checkbox',
					id: `${this.id}-checkbox`,
					name: `${this.id}-checkbox`,
					value: this.checked
				});
				const item = el('div.d-flex', [
					el('div.me-5 ', [ el('label', { for: `${this.id}-checkbox` }, this.label) ]),
					el('div.mb-1', [ checkbox ])
				]);
				this.el = el('li', [ el(`div.dropdown-item#${this.id}`, item) ]);
				break;

			default:
				break;
		}
	}
}
