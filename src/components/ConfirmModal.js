// function getDecisionModal() {
//     return document.getElementById("decisionModal");

import { VARS } from '../core/Global';
import { Menu } from './Menu';
import { Modal } from './Modal';

// }

export class ConfirmModal extends Modal {
	constructor({ menuId, title = '', body = '', submitBtnLabel = 'Accept' }) {
        super({ menuId: menuId, title: title, body: body, submitBtnLabel: submitBtnLabel });
        this.type = 'confirm';
        this.render();
	}
}