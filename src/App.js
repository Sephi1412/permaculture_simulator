import * as THREE from 'three';
import * as $ from "jquery";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { OptionTabs } from './components/OptionTabs';

import './resources/css/main.css';
import './resources/css/components.css';
import { testEventListeners } from './core/EventListeners';
import { DecisionModal } from './components/DecisionModal';


const decisionModal = new DecisionModal({menuId: "decision-modal"});
OptionTabs();
testEventListeners();