import { VARS } from '../core/Global';
import {
	el,
	mount
} from 'redom';
import { Component } from './Component';

export class HorizontalNavTabs extends Component {
	constructor({ id }) {
		super({ componentID: id });
		this.navTabs = [];
		this.tabContents = [];
		this.buttons = [];
		this.tabs = [];
	}

	generateNavTabs() {
		this.navTabs = el("div.col-4", [
			el("div.list-group", [this.buttons], {
				id: `${this.id}-tab`,
				role: "tablist",
				"aria-orientation": "vertical"
			})
		])
	}

	generateTabContents() {
		this.tabContents = el("div.col-8 my-auto mx-auto", [
			el("div.tab-content nav-tab-content", { id: `${this.id}-tabContent` }, [this.tabs])
		]);
	}

	generateComponent() {
		this.generateNavTabs();
		this.generateTabContents();
		this.el = el("div.container row nav-tab-container", [
			this.navTabs,
			this.tabContents
		], {
			id: `${this.id}`,
		})
	}

	addNewItem({ tabID, label, contents, isActive = false }) {
		const buttonID = `${tabID}-tab`;
		const buttonClass = (isActive) ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action";
		const tabClass = (isActive) ? "tab-pane fade show active" : "tab-pane fade";

		let button = el(`a.${buttonClass}`, {
			role: "tab",
			id: buttonID,
			href: `#${tabID}`,
			"data-bs-toggle": "list",
			"aria-controls": tabID,
			"aria-selected": `${isActive}` // If active, true
			// "data-bs-target": `#${tabID}`,
		},
			label);

		let tab = el(`div.${tabClass} `, {
			id: tabID,
			role: "tabpanel",
			"aria-labelledby": buttonID,
			tabindex: "0",
		},
			[el("div.align-items-center justify-content-center", contents)],
		)

		this.buttons.push(button);
		this.tabs.push(tab);
	}
}
