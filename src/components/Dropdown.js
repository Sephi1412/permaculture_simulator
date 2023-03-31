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

	addOption({ label, callbacks, attrs }) {
		const childrenId = `${this.id}-item-${this.n_children}`;
		const item = new DropdownOption({ label: label, id: childrenId, callbacks: callbacks, attrs: attrs });
		setChildren(this.optionContainer, item.el);
        
		setChildren(this.optionContainer, item);
		this.n_children += 1;
	}
}

class DropdownOption extends Component {
	constructor({ label = '', id, callbacks, attrs }) {
		super({ componentID: id });
		this.label = label;
		this.callbacks = callbacks;
		this.attrs = attrs;

		this.render();
	}

	generateComponent() {
		// const item = el('li', [ el(`a.dropdown-item`, label) ]);
		this.el = el('li', [ el(`a.dropdown-item#${this.id}`, this.label) ]);
	}
}

// button class="btn active-btn disabled" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                   Dropdown button
//                 </button>
//                 <ul class="dropdown-menu">
//                   <li><a class="dropdown-item" href="#">Action</a></li>
//                   <li><a class="dropdown-item" href="#">Another action</a></li>
//                   <li><a class="dropdown-item" href="#">Something else here</a></li>
//                 </ul>
