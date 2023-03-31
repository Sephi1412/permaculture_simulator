import { el, mount, setChildren } from 'redom';

export class Component {
	constructor({ name = '', componentID, parent = document.getElementById('temporal-container') }) {
		/*
			el -> Main HTML Component to Render
			Flow: generateComponent() -> validate() -> mount() -> setEventListeners()
		*/
		this.id = componentID;
		this.name = name;
		this.callbacks = {};
		this.n_children = 0;
		this.parent = parent;
		this.children = [];
		this.el = null;
	}

	validate() {
		let msg = '';
		let status = true;

		if (!this.id) {
			msg += 'An ID must be defined\n';
			status = false;
		}

		if (this.el === null) {
			msg += 'An HTML element must be defined\n';
			status = false;
		}

		if (!status) {
			alert(msg);
		}

		return status;
	}

	generateComponent() {
		this.el = el('div'); // Just a place holder
	}

	render() {
		this.generateComponent();
		this.validate();
		mount(this.parent, this.el);
		this.setInputEventListeners();
	}

	update() {
		return;
	}

	addChildren({ children, props }) {
		this.el.appendChild(children.el);
		this.n_childrens += 1;
	}

	setParent(parent) {
		console.log(parent, this.el);
		mount(parent, this.el);
	}

	setInputEventListeners() {
		const types = Object.keys(this.callbacks);
		types.forEach((type) => {
			this.el.addEventListener(type, (event) => this.handleUpdate(event));
		});
	}

	setCallbacks(callbacks) {
		this.callbacks = callbacks;
	}

	addCallback(type, callback) {
		this.callbacks[type] = callback;
	}
}
