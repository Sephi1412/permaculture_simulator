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
		this.setEventListeners();
	}

	update() {
		return;
	}

	addChildren({ children, props }) {
		this.el.appendChild(children.el);
		this.n_childrens += 1;
	}

	setParent(parent) {
		mount(parent, this.el);
	}

	setEventListeners() {
		const types = Object.keys(this.callbacks);
		console.log(this.callbacks);
		types.forEach((type) => {
			const callback = this.callbacks[type]
			this.el.addEventListener(type, (event) => callback(event));
		});
	}

	setCallbacks(callbacks) {
		this.callbacks = callbacks;
		this.setEventListeners();
	}

	addCallback(type, callback) {
		this.callbacks[type] = callback;
		this.setEventListeners();
	}

	setParam({ paramName, value }) {
		this[paramName] = value;
	}
}
