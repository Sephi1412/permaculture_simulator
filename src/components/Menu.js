/* 
    Cada menu puede ejecutar una función cuando se abre o cuando se cierra
        => Guardar los callbacks 
*/

export class Menu {
	constructor({ id }) {
		this.id = id;
		this.body = '';
		this.title = '';
		this.type = 'default';
        this.variant = 'default';
        this.targetId = 'menu-section';
		this.onOpenCallback = defaultCallback;
		this.onCloseCallback = defaultCallback;
        this.onSubmitCallback = defaultCallback;
        this.onDeclineCallback = defaultCallback;
	}

	setBody(body) {
		this.body = body;
        const bodyId = `${this.id}-body`;
        document.getElementById(bodyId).innerHTML = body;
	}

	setTitle(title) {
		this.title = title;
        const titleId = `${this.id}-title`;
        document.getElementById(titleId).innerHTML = title;
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

function defaultCallback() {
	return;
}
