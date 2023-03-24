// function getDecisionModal() {
//     return document.getElementById("decisionModal");

import { VARS } from '../core/Global';
import { Menu } from './Menu';

// }
let modalValues = {
    title: '',
    body: ''
};

export class DecisionModal extends Menu {
    constructor({ menuId }) {
        super({ id: menuId });
        this.type = 'modal';
        this.variant = 'decision';
        this.generate();
    }

    generate() {
        const code = `
        <div class="modal fade" id="${this.id}" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${this.id}-title">Modal title</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="${this.id}-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="${this.id}-decline-btn" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="${this.id}-submit-btn">Save changes</button>
                </div>
            </div>
        </div>
        </div>`;

        document.getElementById(this.targetId).insertAdjacentHTML("beforeend", code);
        VARS.MENUS[this.id] = this;
    }

    show() {
        $(`#${this.id}`).modal('show');
    }

    setParam({ paramName, value }) {
        console.log(this[paramName]);
        this[paramName] = value;
        console.log(this[paramName]);
    }


}

export function setTitle(title) {
    modalValues.title = title;
    console.log(modalValues);
}

export function setBody(body) {
    modalValues.body = body;
}

export function setOnOpenCallback() {
    console.log(modalValues);
    const modalTitle = document.getElementById('decisionModalTitle');
    const modalBody = document.getElementById('decisionModalBody');

    modalTitle.innerText = modalValues.title;
    modalBody.innerText = modalValues.body;
}

function setOnCloseCallback() { }

function showDecisionModal() { }

function closeDecisionModal() { }
