import * as THREE from 'three';
import * as $ from 'jquery';
import onChange from 'on-change';
import { popper } from '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { el, mount } from 'redom';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import { OptionTabs } from './components/OptionTabs';

import './resources/css/main.css';
import './resources/css/components.css';
import { testEventListeners } from './core/EventListeners';
import { DecisionModal } from './components/DecisionModal';
import { RangeInput } from './components/RangeInput';
import { SelectInput } from './components/SelectInput';
import { Checkbox } from './components/Checkbox';
import { TextAreaInput } from './components/TextAreaInput';
import { TextInput } from './components/TextInput';
import { Offcanvas } from './components/Offcanvas';
import { Accordion } from './components/Accordion';


const newObjective = {
	currentValue: -1.0
};

function updateNewObjective(props) {
	console.log('updateNewObjective(', props, ');');
	newObjective['currentValue'] = props.value;
	console.log('UPDATE NEW OBJECTIVE', newObjective);
}

const target = document.getElementById('game-container');
const textInput = new TextInput({
	id: 'text-input',
	label: 'Objective Title',
	callbacks: {
		input: updateNewObjective
	},
	props: {
		placeholder: 'Insert here the name of the objetive'
	}
});

const textArea = new TextAreaInput({
	id: 'text-area',
	containerID: 'input-test',
	label: 'Description',
	callbacks: {
		input: updateNewObjective
	}
});

const selectInput = new SelectInput({
	id: 'select-input',

	defaultValue: 'Select an Option',
	options: {
		key_seq: 'Key Sequence',
		terrain_edit: 'Terrain Modification',
		use_tool: 'Use a Specific Tool'
	},
	label: 'Exercise Type',
	callbacks: {
		change: updateNewObjective
	}
});

const checkInput = new Checkbox({
	id: 'check-input',
	label: 'Exercise Type',
	callbacks: {
		change: updateNewObjective
	}
});

const rangeInput = new RangeInput({
	id: 'range-input',
	props: {
		min: 0,
		max: 2,
		currentValue: 1,
		step: 0.5
	},
	label: 'Terrain Opacity',
	callbacks: {
		change: updateNewObjective,
		click: updateNewObjective
	}
});


rangeInput.setParent(target);
const testAccordion = new Accordion({ id: 'test-accordion' });
testAccordion.setParent(target);


testAccordion.addChildren({ itemLabel: 'Objective N°1', itemContent: el("div", [rangeInput, checkInput, selectInput]) });