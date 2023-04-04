import * as THREE from 'three';
import { TERRAIN_VALUES, VARS } from './Global';

const inactive = 0;
const pressed = 1;
const held = 2;
const released = 3;

export class InputEngine {
    constructor() {
        this.activeKeys = [];
        this.inputBuffer = [];
        this.releasedKeys = [];
        this.mouseIsMoving = false;
        this.mousePosition = new THREE.Vector2();

        this.heldTimers = {
            CONTROL: 0.0,
            Z: 0.0,
            Y: 0.0,
            W: 0.0,
            A: 0.0,
            S: 0.0,
            D: 0.0,
            LEFT_CLICK: 0.0,
            MIDDLE_CLICK: 0.0,
            RIGHT_CLICK: 0.0,
            WHEEL_UP: 0.0,
            WHEEL_DOWN: 0.0,
            ARROWUP: 0.0,
            ARROWDOWN: 0.0
        };

        this.states = {
            CONTROL: inactive,
            Z: inactive,
            Y: inactive,
            W: inactive,
            A: inactive,
            S: inactive,
            D: inactive,
            LEFT_CLICK: inactive,
            MIDDLE_CLICK: inactive,
            RIGHT_CLICK: inactive,
            WHEEL_UP: inactive,
            WHEEL_DOWN: inactive,
            ARROWUP: inactive,
            ARROWDOWN: inactive
        };

        this.pointerRaycaster = new THREE.Raycaster();
        this.collisionRaycaster = new THREE.Raycaster();


    }

    _init() {
        this.pointerRaycaster = new THREE.Raycaster();
        this.collisionRaycaster = new THREE.Raycaster();
        // this.collisionRaycaster.params.Points.threshold = 0.1;
        this.collisionRaycaster.params.Points.threshold = 0.25 //(TERRAIN_VALUES.CURSOR_SIZE) / 2.0;
        this.pointerRaycaster.params.Points.threshold = (TERRAIN_VALUES.CURSOR_SIZE) / 1.0;


        this.setUpInputListeners();
    }

    update() {
        const activeKeys = [];
        const releasedKeys = [];
        const inputBuffer = this.inputBuffer;

        inputBuffer.forEach(key => {
            if (this.keysAreReleased(key)) {
                releasedKeys.push(key);
            }

            if (this.keysAreHeld(key)) {
                this.heldTimers[key] += VARS.FRAME_INTERVAL;
                activeKeys.push(key);
            }

            if (this.keysArePressed(key)) {
                this.setKeyAsHeld(key)
                activeKeys.push(key);
            }
        });

        this.inputBuffer = activeKeys;
        this.releasedKeys = releasedKeys;
    }

    handleInputBuffer() {
        const ctrlState = this.keysAreActive("CONTROL");
        const inputBuffer = this.inputBuffer;
        const releasedKeys = this.releasedKeys;

        if (ctrlState) {
            // Place Holder
        }
        else {
            if (this.mouseIsMoving) {
                //
            }

            releasedKeys.forEach(key => {
                switch (key) {
                    case "LEFT_CLICK":
                    case "RIGHT_CLICK":
                    case "ARROWUP":
                    case "ARROWDOWN":
                    case "W":
                    case "S":
                    default:
                        break;
                }
            });

            inputBuffer.forEach(key => {
                switch (key) {
                    case "LEFT_CLICK":

                        break;
                    case "RIGHT_CLICK":

                        break;
                    case "ARROWUP":
                    case "ARROWDOWN":
                    case "W":
                    case "S":
                    default:
                        break;
                }
            });
        }
    }



    handleCursorMovement(event) {
        this.mousePosition.x = event.offsetX / VARS.RENDERER.domElement.clientWidth * 2 - 1;
        this.mousePosition.y = -(event.offsetY / VARS.RENDERER.domElement.clientHeight) * 2 + 1;
        this.mouseIsMoving = true;
    }

    handleMouseInput(event) {
        const mouseInput = event.button;
        if (event.type === 'mousedown') {
            switch (mouseInput) {
                case 0: // Left Button
                    this.setKeyAsPressed("LEFT_CLICK");
                    break;
                case 1: // Middle Button
                    this.setKeyAsPressed("MIDDLE_CLICK");
                    break;
                case 2: // Right Button
                    this.setKeyAsPressed("RIGHT_CLICK");
                    break;

                default:
                    break;
            }
        }
        if (event.type === 'mouseup') {
            switch (mouseInput) {
                case 0: // Left Button
                    this.setKeyAsReleased("LEFT_CLICK");
                    break;
                case 1: // Middle Button
                    this.setKeyAsReleased("MIDDLE_CLICK");
                    break;
                case 2: // Right Button
                    this.setKeyAsReleased("RIGHT_CLICK");
                    break;
                default:
                    break;
            }
        }
    }

    cursorIsActive(event) {
        const typeEvent = event.type;
        switch (typeEvent) {
            case 'mouseover':
                VARS.FLAGS.MOUSE_ON_GAME = true;
                break;
            case 'mouseleave':
                VARS.FLAGS.MOUSE_ON_GAME = false;
                break;
            default:
                break;
        }
    }

    updateInputBuffer() {
        (this.releasedKeys).forEach(key => {
            this.setKeyAsInactive(key);
            this.heldTimers[key] = 0.0;
        });

        this.mouseIsMoving = false;
    }

    setCursorRaycasterFromCamera() {
        const raycaster = this.collisionRaycaster;
        const mousePos = this.mousePosition;
        const camera = VARS.CAMERA;
        raycaster.setFromCamera(mousePos, camera);

        return raycaster;
    }

    setCollisionRaycasterFromArbitraryPosition(position, direction) {
        const raycaster = this.pointerRaycaster;
        raycaster.set(position, direction.normalize());
        return raycaster;
    }

    setUpInputListeners() {
        let target = document.getElementById('game-container');
        target.addEventListener('mousemove', (event) => this.handleCursorMovement(event));
        // document.addEventListener('keyup', (event) => this.handleKeyInputs(event));
        // document.addEventListener('keydown', (event) => this.handleKeyInputs(event));

        document.addEventListener('mouseup', (event) => this.handleMouseInput(event));
        document.addEventListener('mousedown', (event) => this.handleMouseInput(event));

        // target.addEventListener('wheel', (event) => this.handleMouseWheel(event));

        target.addEventListener('contextmenu', (event) => event.preventDefault());
        target.addEventListener('mouseover', (event) => this.cursorIsActive(event));
        target.addEventListener('mouseleave', (event) => this.cursorIsActive(event));
    }

    setKeyAsPressed(key) {
        this.states[key] = pressed
        this.inputBuffer.push(key);
    }

    setKeyAsInactive(key) { this.states[key] = inactive }
    setKeyAsHeld(key) { this.states[key] = held }
    setKeyAsReleased(key) { this.states[key] = released }

    keysAreInactive(...keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] == inactive;
        });
        return state

    }

    keysArePressed(...keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] == pressed;
        });
        return state

    }

    keysAreHeld(...keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] == held;
        });
        return state
    }

    keysAreActive(...keys) {
        let state = false;
        let keyStates = { ...this.states };
        keys.forEach(key => {
            state |= keyStates[key] > inactive;
        });
        return state
    }

    keysAreReleased(...keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] === released;
        });
        return state
    }

    arrayKeysAreInactive(keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] == inactive;
        });
        return state

    }

    arrayKeysArePressed(keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] == pressed;
        });
        return state

    }

    arrayKeysAreHeld(keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] == held;
        });
        return state
    }

    arrayKeysAreActive(keys) {
        let state = false;
        let keyStates = { ...this.states };
        keys.forEach(key => {
            state |= keyStates[key] > inactive;
        });
        return state
    }

    arrayKeysAreReleased(keys) {
        let state = false;
        keys.forEach(key => {
            state |= this.states[key] === released;
        });
        return state
    }
}