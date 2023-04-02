import { VARS } from '../core/Global';
import { Menu } from './Menu';
import { el, mount } from 'redom';

export class Modal extends Menu {
	constructor({ menuId, title = '', body = '', type = '', submitBtnLabel = 'Accept', declineBtnLabel = 'Close' }) {
		// Types: Dialog, Decision, Confirm
		super({ id: menuId });
		this.title = title;
		this.body = body;
		this.type = type;
		this.parent = document.body;
		this.submitBtnLabel = submitBtnLabel;
		this.declineBtnLabel = declineBtnLabel;
		// this.render();
	}

	generateHeader() {
		this.modalTitle = el(`h1.modal-title fs-5#${this.id}-title`, this.title);
		this.closeButton = el(`button.btn-close`, { 'data-bs-dismiss': 'modal', 'aria-label': 'Close' });
		this.header = el('div.modal-header', [ this.modalTitle, this.closeButton ]);
	}

	generateBody() {
		this.modalBody = el('div.modal-body');
	}

	generateFooter() {
		switch (this.type) {
			case 'decision':
				this.declineBtn = el('button.btn btn-secondary', {
					type: 'button',
					'data-bs-dismiss': 'modal',
					textContent: this.declineBtnLabel
				});
				this.submitBtn = el('button.btn btn-primary', {
					type: 'button',
					'data-bs-dismiss': 'modal',
					textContent: this.submitBtnLabel
				});
				this.footer = el('div.modal-footer', [ this.declineBtn, this.submitBtn ]);
				break;
			case 'confirm':
				this.submitBtn = el('button.btn btn-primary', {
					type: 'button',
					'data-bs-dismiss': 'modal',
					textContent: this.submitBtnLabel
				});
				this.footer = el('div.modal-footer', [ this.submitBtn ]);
				break;
			default:
				break;
		}
	}

	generateComponent() {
		this.generateHeader();
		this.generateBody();
		this.generateFooter();
		this.dialog = el('div.modal-dialog modal-dialog-centered modal-dialog-scrollable', [
			el('div.modal-content', [ this.header, this.modalBody, this.footer ])
		]);

		this.el = el(
			`div.modal fade#${this.id}`,
			{
				tabindex: '-1',
				'aria-labelledby': `${this.id}-title`,
				'aria-hidden': 'true'
			},
			[ this.dialog ]
		);
	}
}
