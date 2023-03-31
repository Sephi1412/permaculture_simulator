import { VARS } from '../core/Global';
import { Menu } from './Menu';
import { el, mount } from 'redom';

export class Offcanvas extends Menu {
	constructor({ menuId, title = '', body = '', placement = 'start' }) {
		super({ id: menuId });
		this.title = title;
		this.body = body;
		this.placement = placement;
		this.generate();
		this.inject();
	}

	generate() {
		this.offcanvasTitle = el('h5.offcanvas-title', { textContent: this.title });
		this.closeBtn = el('button.btn-close ', { type: 'button', 'data-bs-dismiss': 'offcanvas', 'aria-label': 'Close' });
		this.header = el('div.offcanvas-header', [this.offcanvasTitle, this.closeBtn]);
		this.offCanvasBody = el(`div.offcanvas-body#${this.id}-body`, [el('div', { textContent: this.body })]);
		this.el = el(`div.offcanvas offcanvas-${this.placement}`, [this.header, this.offCanvasBody], { id: this.id });

	}

	setEvents() {
		this.closeBtn.addEventListener('click', () => this.bsOffcanvas.hide());
		this.el.addEventListener('hidden.bs.offcanvas', (event) => this.onCloseCallback(event));
		this.el.addEventListener('show.bs.offcanvas', (event) => this.onOpenCallback(event));
	}

	inject() {
		mount(document.body, this.el);
		this.bsOffcanvas = new bootstrap.Offcanvas(`#${this.id}`)
		this.setEvents();
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