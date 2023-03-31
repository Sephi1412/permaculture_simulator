import { el, mount, setChildren } from 'redom';
import onChange from 'on-change';

export class Component {
	constructor({ name = '', componentID }) {
		this.id = componentID;
		this.name = name;
		this.callbacks = {};
		this.n_children = 0;
		this.parent = document.getElementById('temporal-container');
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

	render() {
		this.el = el('div'); // Just a place holder
		mount(this.parent, this.el);
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

	setCallbacks(callbacks) {
		this.callbacks = callbacks;
	}

	addCallback(type, callback) {
		this.callbacks[type] = callback;
	}
}
