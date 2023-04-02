// function getDecisionModal() {
//     return document.getElementById("decisionModal");

import { VARS } from '../core/Global';
import { Menu } from './Menu';
import { Modal } from './Modal';

// }

export class DecisionModal extends Modal {
	constructor({ menuId, title = '', body = '', submitBtnLabel = 'Accept', declineBtnLabel = 'Close' }) {
        super({ menuId: menuId, title: title, body: body, submitBtnLabel: submitBtnLabel, declineBtnLabel: declineBtnLabel });
        this.type = 'decision';
        this.render();
	}
}