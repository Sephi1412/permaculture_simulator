import { el, mount } from 'redom';
import onChange from 'on-change';
import { Component } from './Component';

export class Input extends Component {
	constructor({ id, parent, containerProps = {}, labelProps = {}, inputClass = '', inputProps = {}, callbacks }) {
		super({ componentID: id });
		/*
            Container Props: Mainly related to style
            Label Props: Mainly related to style. Also contains the label string
            inputProps: Class, Type, min, max, current, etc.
            callbacks: Object that contains different type of functions. The key
            associated to each function is the type of event that should activate it.

        */
		this.callbacks = callbacks;
		this.inputClass = inputClass;
		this.inputProps = inputProps;
		this.labelProps = labelProps;
		this.value = inputProps.value;
		if (parent) this.parent = parent;
		this.containerProps = containerProps;
	}

	createInput() {
		this.input = el(`input.${this.inputClass}`, this.inputProps);
		this.inputContainer = el('div.container', this.input);
	}

	setEventListeners() {
		const types = Object.keys(this.callbacks);
		types.forEach((type) => {
			this.input.addEventListener(type, (event) => this.handleUpdate(event));
		});
	}

	createLabel() {
		this.label = el('div. input-label d-flex ms-1', { textContent: this.labelProps.textContent });
	}

	createElement() {
		this.el = el('div.container d-flex flex-column', [ this.label, el('div', [ this.inputContainer ]) ]);
	}

	generateComponent() {
		this.createInput();
        this.createLabel();
		this.createElement();
	}

	handleUpdate(event) {
		this.currentVal = event.srcElement.value;
		this.useCallbacks({ event: event, value: this.currentVal });
	}

	useCallbacks(props) { // {event, value}
		const event = props.event;
		const eventCallback = this.callbacks[event.type];
		if (eventCallback) eventCallback(props);
		else defaultEventCallback(event);
	}
}

function defaultEventCallback(event) {
	alert(`There's not callback defined for "${event.type}" events`);
}
