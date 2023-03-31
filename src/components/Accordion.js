import { el, mount, setChildren } from 'redom';
import { Component } from './Component';


export class Accordion extends Component {
	constructor({ id, parent }) {
		super({ componentID: id });
		if (parent) this.parent = parent;
		this.render();
	}

	generateComponent() {
		this.el = el(`div.accordion container#${this.id}`);
	}

	setParent(parent) {
		mount(parent, this.el);
	}

	addChildren({ itemLabel, itemContent }) {
		const children = new AccordionItem({
			label: itemLabel,
			content: itemContent,
			parent: this.el,
			parentID: this.id,
			index: this.n_childrens
		});
		children.button.addEventListener('click', (event) => {
			this.activeButton = children.button;
			console.log(this.activeButton.id);
		});
		this.el.appendChild(children.el);
		this.n_childrens += 1;
	}
}

class AccordionItem extends Component {
	constructor({ label = '', content, parent, parentID, index }) {
		const id = `${parentID}-item-${index}`;
		super({ componentID: id, parent: parent });
		this.parent = parent;
		this.headerID = `${this.id}-header`;
		this.bodyID = `${this.id}-body`;
		this.label = label;
		this.content = content;

		this.render();
		this.setCollapseBehavior();

	}

	generateComponent() {
		this.button = el(`button.accordion-button#${this.id}-button`, {
			type: 'button',
			'data-bs-toggle': 'collapse',
			'data-bs-target': `#${this.bodyID}`,
			'aria-expanded': 'true',
			'aria-controls': `${this.bodyID}`,
			textContent: this.label
		});

		this.body = el(
			`div.accordion-collapse collapse#${this.bodyID}`,
			{ 'data-bs-parent': `${this.parentID}`, 'aria-labelledby': `${this.headerID}` },
			[ el('div.accordion-body', [ this.content ]) ]
		);

		this.header = el(`h2.accordion-header#${this.headerID}`, [ this.button ]);
		this.el = el(`div.accordion-item#${this.id}`, [ this.header, this.body ]);
	}

	setCollapseBehavior() {
		this.bsCollapse = new bootstrap.Collapse(`#${this.bodyID}`, { toggle: false, parent: this.parent });
	}
}