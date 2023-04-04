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

// const game = new Game({mode: "FREE_MODE"});