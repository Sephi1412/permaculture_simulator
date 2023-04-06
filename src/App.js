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
import { Game } from './core/Game';
import { HorizontalNavTabs } from './components/HorizontalNavTabs';
import { generateMainMenu } from './screens/MenuSelection';
import { generateScene } from './core/Main';
import { VARS } from './core/Global';
import { loadImageFromInputField } from './Utils/ImageProcessing';


generateMainMenu();

const target = document.getElementById("game-container");
const imgContainer = el("div.d-flex w-100", [
    el("br"),
    el("img#test-image")
]);
target.appendChild(imgContainer);


document.getElementById("generate-terrain-from-image-btn").addEventListener("click", (event) => {
    loadImageFromInputField();
})




