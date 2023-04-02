// function getDecisionModal() {
//     return document.getElementById("decisionModal");

import { VARS } from '../core/Global';
import { Menu } from './Menu';
import { Modal } from './Modal';

// }

export class DialogModal extends Modal {
	constructor({ menuId, title = '', body = '' }) {
		super({ menuId: menuId, title: title, body: body });
		this.type = 'dialog';
		this.render();
	}
}
