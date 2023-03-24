import * as THREE from 'three';
import * as $ from "jquery";
import onChange from 'on-change';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { OptionTabs } from './components/OptionTabs';

import './resources/css/main.css';
import './resources/css/components.css';
import { testEventListeners } from './core/EventListeners';
import { DecisionModal } from './components/DecisionModal';
import { RangeInput } from './components/RangeInput';
import { SelectInput } from './components/SelectInput';
import { Checkbox } from './components/Checkbox';
import { TextAreaInput } from './components/TextAreaInput';


const decisionModal = new DecisionModal({ menuId: "decision-modal" });
OptionTabs();
testEventListeners();



const newObjective = {
    currentValue: -1.0,
}

function updateNewObjective(props) {
    console.log("updateNewObjective(", props, ");")
    newObjective["currentValue"] = props.value;
    console.log("UPDATE NEW OBJECTIVE", newObjective);
}

const rangeInput = new RangeInput({
    id: "range-input",
    containerID: "input-test",
    props: {
        min: 0,
        max: 2,
        currentValue: 1,
        step: 0.5,
    },
    label: "Terrain Opacity",
    callbacks: {
        "change": updateNewObjective,
        "click": updateNewObjective,
    }
    
})

const selectInput = new SelectInput({
    id: "select-input",
    containerID: "input-test",
    defaultValue: "Select an Option",
    options: {
        "key_seq": "Key Sequence",
        "terrain_edit": "Terrain Modification",
        "use_tool": "Use a Specific Tool"
    },
    label: "Exercise Type",
    callbacks: {
        "change": updateNewObjective,
    }
})

const checkInput = new Checkbox({
    id: "check-input",
    containerID: "input-test",
    label: "Exercise Type",
    callbacks: {
        "change": updateNewObjective,
    },
})

const textArea = new TextAreaInput({
    id: "text-area",
    containerID: "input-test",
    label: "Description",
    callbacks: {
        "input" : updateNewObjective,
    }
})