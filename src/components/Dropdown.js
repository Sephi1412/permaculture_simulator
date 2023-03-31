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

	generateDropdownButton() {}

	generateComponent() {
		this.dropdownBtn = el(`button.btn active-btn`, {
			type: 'button',
			'data-bs-toggle': 'dropdown',
			'aria-expanded': 'false',
			textContent: this.label
		});
		this.optionContainer = el(`ul.dropdown-menu`);
		this.el = el(`div#${this.id}`, [ this.dropdownBtn, this.optionContainer ]);
	}

	addOption({ label, callbacks, toggle = '', target = '' }) {
		let nodes = [];
		const childrenId = `${this.id}-item-${this.n_children}`;
		// console.log(this.optionContainer.childNodes)
		const item = new DropdownOption({ label: label, id: childrenId, callbacks: callbacks, toggle: toggle, target: target });
		// setChildren(this.optionContainer, nodes);
		this.optionContainer.appendChild(item.el);

		this.n_children += 1;
	}
}

class DropdownOption extends Component {
	constructor({ label = '', id, callbacks = {}, toggle = '', target = '' }) {
		super({ componentID: id });
		this.label = label;
		this.callbacks = callbacks;
		this.dataToggle = toggle;
		this.dataTarget = target;

		this.render();
	}

	generateComponent() {
		// const item = el('li', [ el(`a.dropdown-item`, label) ]);
		this.el = el('li', [
			el(`a.dropdown-item#${this.id}`, this.label),
			{ 'data-bs-toggle': this.dataToggle, 'data-bs-target': `#${this.dataTarget}` }
		]);
	}
}

