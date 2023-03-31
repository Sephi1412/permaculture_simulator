import { el, mount, setChildren } from "redom";
import onChange from 'on-change';

class AccordionItem {
    constructor({ parent, parentID, index }) {
        this.id = `${parentID}-item-${index}`;
        this.parent = parent;
        this.headerID = `${this.id}-header`;
        this.bodyID = `${this.id}-body`;

        this._init()
    }

    _init() {
        this.button = el(`button.accordion-button#${this.id}-button`, {
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": `#${this.bodyID}`,
            "aria-expanded": "true",
            "aria-controls": `${this.bodyID}`,
            textContent: `Test Accordion: ${this.id}`
        })

        this.body = el(`div.accordion-collapse collapse#${this.bodyID}`, { "data-bs-parent": `${this.parentID}`, "aria-labelledby": `${this.headerID}`, }, [
            el("div.accordion-body", "{Children msg}")
        ]);

        this.header = el(`h2.accordion-header#${this.headerID}`, [
            this.button
        ])

        this.el = el(`div.accordion-item#${this.id}`, [
            this.header,
            this.body
        ])

        // this.bsCollapse = new bootstrap.Collapse(`#${this.id}-button`)
        // console.log(this.bsCollapse);
        // this.setEventListeners();

    }

    setEventListeners() {
        this.bsCollapse = new bootstrap.Collapse(`#${this.bodyID}`, { toggle: true, parent: this.parent });
        this.button.addEventListener("click", event => {
            $(`#${this.bodyID}`).collapse({ "toggle": true, 'parent': this.parent });

        });
    }
}


export class Accordion {
    constructor({ id }) {
        this.id = id;
        // this.children = {};
        this.n_childrens = 0;
        this._init();
    }

    _init() {
        if (this.id) {
            this.el = el(`div.accordion container#${this.id}`)
        }

        else
            console.error("An ID must be defined for the accordion");
    }

    setParent(parent) {
        mount(parent, this.el);
    }

    addChildren() {
        const children = new AccordionItem({ parent: this.el, parentID: this.id, index: this.n_childrens })
        children.button.addEventListener("click", event => {
            this.activeButton = children.button;
            console.log(this.activeButton.id);
        })
        this.el.appendChild(children.el);
        this.n_childrens += 1;
        // console.log(children.body);
    }
}