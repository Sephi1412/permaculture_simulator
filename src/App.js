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

const gameContainer = document.getElementById("game-container");
const optionTabs = document.getElementById("option-tabs");
const offcanvasTestButton = document.getElementById("btn-test-offcanvas");

const offcanvasTest = new Offcanvas({ menuId: 'offcanvas-test', title: 'Test Offcanvas', body: '', width: 100 });
// offcanvasTest.setParent(gameContainer)


const dropdownTest = new Dropdown({id: 'test-dropdown', parent: optionTabs, label: "Test Dropdown"})
dropdownTest.addOption({label: "Primera Opción", callbacks: {'click': (event) => offcanvasTest.handleVisibility(event)}, attrs: {}})


offcanvasTestButton.addEventListener("click", (event) => {
	offcanvasTest.handleVisibility(event);
})