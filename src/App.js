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
import { Dropdown } from './components/Dropdown';
import { Modal } from './components/Modal';
import { ConfirmModal } from './components/ConfirmModal';
import { DialogModal } from './components/DialogModal';
import { SideLabelCheckbox } from './components/SideLabelCheckbox';

const gameContainer = document.getElementById('game-container');
const optionTabs = document.getElementById('option-tabs');
const offcanvasTestButton = document.getElementById('btn-test-offcanvas');
const testButton = document.getElementById('activate-test-function');

function testEvent(event) {
	alert('PATATIN');
}

const offcanvasTest = new Offcanvas({ menuId: 'offcanvas-test', title: 'Test Offcanvas', onCloseCallback: testEvent });
const testModal = new DialogModal({ menuId: 'test-modal', title: 'Test Modal', submitBtnLabel: 'Hola :b:uto' });
// offcanvasTest.setParent(gameContainer)

const dropdownTest = new Dropdown({ id: 'test-dropdown', parent: optionTabs, label: 'Test Dropdown' });
dropdownTest.addClickableItem({
	label: 'First Option',
	callbacks: { click: (event) => offcanvasTest.handleVisibility(event) },
	attrs: {}
});

dropdownTest.addClickableItem({ label: 'Open Modal', toggle: 'modal', target: 'test-modal' });

offcanvasTestButton.addEventListener('click', (event) => {
	offcanvasTest.handleVisibility(event);
});

dropdownTest.addItemWithCheckbox({
	label: 'View Heightmap',
	onClickCallback: () => console.log('AAAAAAAAA'),
	checked: true,
});
