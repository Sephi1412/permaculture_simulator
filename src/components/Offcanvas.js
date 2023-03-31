import { VARS } from '../core/Global';
import { Menu } from './Menu';
import { el, mount } from 'redom';

export class Offcanvas extends Menu {
	constructor({ menuId, title = '', body = '', placement = 'start', onCloseCallback, onOpenCallback, width = "30" }) {
		super({ id: menuId });
		this.title = title;
		this.body = body;
		this.placement = placement;
		this.width = width;
		this.parent = document.body;

		if (onCloseCallback) this.callbacks['hidden.bs.offcanvas'] = onCloseCallback;
		if (onOpenCallback) this.callbacks['show.bs.offcanvas'] = onOpenCallback;

		this.render();
		this.bsOffcanvas = new bootstrap.Offcanvas(`#${this.id}`)
	}

	generateComponent() {
		this.offcanvasTitle = el('h5.offcanvas-title', { textContent: this.title });
		this.closeBtn = el('button.btn-close ', { type: 'button', 'data-bs-dismiss': 'offcanvas', 'aria-label': 'Close' });
		this.header = el('div.offcanvas-header', [ this.offcanvasTitle, this.closeBtn ]);
		this.offCanvasBody = el(`div.offcanvas-body#${this.id}-body`, [ el('div', { textContent: this.body }) ]);
		this.el = el(`div.offcanvas offcanvas-${this.placement}`, [ this.header, this.offCanvasBody ], { id: this.id });
		this.el.style["width"] = `${this.width}vw`;

	}

	handleVisibility(event) {
		this.bsOffcanvas.toggle();
	}

	setTitle(newTitle) {
		this.offcanvasTitle.textContent = newTitle;
	}

	addContentToBody(element) {
		this.offCanvasBody.appendChild(element.el);
	}
}
