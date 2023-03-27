// function getDecisionModal() {
//     return document.getElementById("decisionModal");

import { VARS } from '../core/Global';
import { Menu } from './Menu';
import { el, mount } from 'redom';

import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js';

let modalValues = {
	title: '',
	body: ''
};

export class Offcanvas extends Menu {
	constructor({ menuId, title = '', body = '', placement = 'start' }) {
		super({ id: menuId });
		this.title = title;
		this.body = body;
		this.placement = placement;
		this.show = false;
		this.generate();
		this.inject();
	}

	generate() {
		this.offcanvasTitle = el('h5.offcanvas-title', { textContent: this.title });
		this.closeBtn = el('button.btn-close', { type: 'button', 'data-bs-dismiss': 'offcanvas', 'aria-label': 'Close' });
		this.header = el('div.offcanvas-header', [ this.offcanvasTitle, this.closeBtn ]);
		this.offCanvasBody = el('div.offcanvas-body', [ el('div', { textContent: 'Lorem Ipsum' }) ]);
		this.el = el(`div.offcanvas offcanvas-start#${this.id}`, [ this.header, this.offCanvasBody ]);

		this.setEvents();
	}

	setEvents() {
		// this.closeBtn.setAttribute("data-bs-dismiss", "offcanvas")
		this.closeBtn.addEventListener('click', () => this.handleVisibility());
		this.el.addEventListener('hide.bs.offcanvas', () => {
			this.show = false;
            this.el.classList.toggle('show');
		});
	}

	inject() {
		mount(document.body, this.el);
	}

	handleVisibility() {
		//
		// const visibilityClass = this.show ? "show" : "";
		if (this.show) {
			this.el.classList.toggle('hiding');
			this.show = false;
		} else {
			this.show = true;
			this.el.classList.toggle('show');
		}
		// var bsOffcanvas = new bootstrap.Offcanvas(this.el)
		// bsOffcanvas.toggle();
	}
}
