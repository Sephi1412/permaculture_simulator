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
        this.button = el("button.accordion-button", {
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": `#${this.bodyID}`,
            "aria-expanded": "true",
            "aria-controls": `${this.bodyID}`,
            textContent: `Test Accordion: ${this.id}`
        })

        this.body = el(`div.accordion-collapse collapse#${this.bodyID}`, { "data-bs-parent": `${this.id}`, "aria-labelledby": `${this.headerID}`, }, [
            el("div.accordion-body", "{Children msg}")
        ]);

        this.header = el(`h2.accordion-header#${this.headerID}`, [
            this.button
        ])

        this.el = el(`div.accordion-item#${this.id}`, [
            this.header,
            this.body
        ])

        mount(this.parent, this.el);
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
        this.children = {};
        this.n_childrens = 0;
        this.testCollapse();
    }

    _init() {
        if (this.id) {
            this.el = el(`div.accordion#${this.id}`)
            mount(document.getElementById("game-container"), this.el);
            this.addChildren();
        }

        else
            console.error("An ID must be defined for the accordion");
    }

    testCollapse() {
        this.button = el('button.collapsible', {
            type: "button",
            textContent: "Open Collapsible"
        });



        this.content = el("div.content", {textContent:})


        this.parent = el("div", [
            this.button,
            this.content
        ])

        mount(document.getElementById("game-container"), this.parent);


    }

    addChildren() {
        const children = new AccordionItem({ parent: this.el, parentID: this.id, index: this.n_childrens })
        // console.log(children.body);
    }
}