import * as THREE from 'three';
import { TerrainManager } from '../actors/TerrainManager';
import { updateActors, VARS } from "./Global";
import { GraphicsEngine } from './Graphics';
import { InputEngine } from './InputEngine';

export class Game {
    constructor({ mode, menuSelectionData }) {
        this.globalDeltaTime = 0;
        this.globalClock = new THREE.Clock();
        this.gameMode = VARS.GAME_MODE = mode;
        this.menuSelectionData = VARS.MENU_SELECTION_DATA = menuSelectionData;

        this.initEngine();
        this.initActors();

        VARS.RENDERER.setAnimationLoop(() => this.freeModeAnimationLoop());

        // this.graphics.currentScene.add(this.plane);

        // // Points 
        // const pointsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
        // this.points = new THREE.Points(geometry, pointsMaterial);

        // this.graphics.currentScene.add(this.points);

        // console.log(this.plane);


    }

    initEngine() {
        VARS.GRAPHICS._init();
        VARS.INPUTS_ENGINE._init();
    }

    initActors() {
        // Terrain;
        VARS.MANAGERS.terrain = new TerrainManager();
        VARS.MANAGERS.terrain.createNewTerrainWithOffset({ xCoord: 0.0, zCoord: 0.0 });
        VARS.MANAGERS.terrain.createNewTerrainWithOffset({ xCoord: 16.0, zCoord: 0.0 });
        VARS.MANAGERS.terrain.createNewTerrainWithOffset({ xCoord: -16.0, zCoord: 0.0 });
        // VARS.GRAPHICS.currentScene.add(VARS.ACTORS.terrain.model);
    }

    freeModeAnimationLoop() {
        if (VARS.FRAME_INTERVAL < VARS.GLOBAL_DELTA_TIME) {
            // VARS.INPUTS_ENGINE.handleInputBuffer();
            updateActors();
            VARS.INPUTS_ENGINE.update();
            VARS.RENDERER.render(VARS.SCENE, VARS.CAMERA);
            this.setupNextRenderCycle();
            VARS.GLOBAL_DELTA_TIME = VARS.GLOBAL_DELTA_TIME % VARS.FRAME_INTERVAL;
        }
        VARS.GLOBAL_DELTA_TIME += this.globalClock.getDelta();
    }


    setupNextRenderCycle() {
        VARS.INPUTS_ENGINE.updateInputBuffer();

    }

    getPoints() {
        const raycaster = VARS.INPUTS_ENGINE.setRaycasterFromCamera();
        const testArray = [];
        // const intersects = raycaster.intersectObject(this.points);


        // if (intersects.length > 0) {
        //     console.log(intersects[0]);
        // }

    }
}