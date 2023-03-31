/* 
    Cada menu puede ejecutar una función cuando se abre o cuando se cierra
        => Guardar los callbacks 
*/

import { Component } from './Component';

export class Menu extends Component {
	constructor({ id }) {
		super({ componentID: id });
        this.bodyID = `${this.id}-body`;
        this.headerID = `${this.id}-title`
		this.type = 'default';
		this.variant = 'default';
		this.onOpenCallback = defaultCallback;
		this.onCloseCallback = defaultCallback;
		this.onSubmitCallback = defaultCallback;
		this.onDeclineCallback = defaultCallback;
        this.parent = document.body
	}

	setOnOpenCallback(callback) {
		this.onOpenCallback = callback;
	}

	setOnCloseCallback(callback) {
		this.onCloseCallback = callback;
	}

	setOnSubmitCallback(callback) {
		this.onSubmitCallback = callback;
	}

	setOnDeclineCallback(callback) {
		this.onDeclineCallback = callback;
	}
}

function defaultCallback(event) {
	return;
}
