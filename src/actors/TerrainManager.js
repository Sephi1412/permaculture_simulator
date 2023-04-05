import * as THREE from 'three';

import { VARS } from "../core/Global";
import { Terrain } from "./Terrain";

export class TerrainManager {
    constructor() {
        this.terrainData = VARS.MENU_SELECTION_DATA;
        this.width = 16;
        this.height = 16;
        this.widthSegments = 8;
        this.heightSegments = 8;
        this.n_chunks = 0;
        this.max_chunks = 1;
        this.planeGroup = new THREE.Group();
        this.pointGroup = new THREE.Group();
        this.cursorPos = new THREE.Vector3(0.0, 0.0, 0.0);

        this.chunks = {};
        this.selectedVertices = {} // Collection of Selected Points on each chunk;

        VARS.SCENE.add(this.planeGroup);
        VARS.SCENE.add(this.pointGroup);
    }

    createNewTerrainChunk({ xCoord = 0.0, yCoord = 0.0, zCoord = 0.0 }) {
        const chunk = new Terrain({
            chunkIndex: this.n_chunks,
            width: this.width,
            height: this.height,
            widthSegments: this.widthSegments,
            heightSegments: this.heightSegments,
            xPos: xCoord,
            yCoord: yCoord,
            zPos: zCoord
        });
        // chunk.moveTo({ xCoord: xCoord, zCoord: zCoord })
        this.planeGroup.add(chunk.model);
        this.pointGroup.add(chunk.points);
        this.chunks[chunk.id] = chunk;
        this.selectedVertices[chunk.id] = [];
        this.n_chunks += 1;
    }


    updateActors() {
        if (VARS.INPUTS_ENGINE.mouseIsMoving) {
            this.projectCursorPosition()
            this.getVerticesOnSelectedArea();
        }

        const chunkIDs = Object.keys(this.chunks);
        chunkIDs.forEach(chunkID => {
            this.chunks[chunkID].update();
        });

        if (VARS.INPUTS_ENGINE.keysArePressed("LEFT_CLICK") && VARS.INPUTS_ENGINE.heldTimers["LEFT_CLICK"] == 0.0) {
            this.testVerticesOnSelectedArea();
        }
        // const chunksIDs = Object.keys(this.chunks);
        // chunksIDs.forEach(chunkID => {
        //     this.chunks[chunkID].update();
        // });
    }

    projectCursorPosition() {
        const raycaster = VARS.INPUTS_ENGINE.setCursorRaycasterFromCamera();

        const intersects = raycaster.intersectObject(this.planeGroup, true);
        if (intersects.length > 0) {
            this.cursorPos = new THREE.Vector3(
                intersects[0].point.x / 1,
                intersects[0].point.y / 1,
                intersects[0].point.z / 1
            );

            this.getVerticesOnSelectedArea();
        }
    }

    getVerticesOnSelectedArea() {
        this.selectedVertices = {};
        const position = this.cursorPos;
        const raycaster = VARS.INPUTS_ENGINE.setCollisionRaycasterFromArbitraryPosition(position, new THREE.Vector3(0, VARS.MAX_SCENE_HEIGHT, 0.01).normalize())
        const intersectedPoints = raycaster.intersectObject(this.pointGroup, true);
        this.selectedVertices = [...new Map(intersectedPoints.map(item => [item["index"], item])).values()]

    }


    testVerticesOnSelectedArea() {
        const position = this.cursorPos;
        const raycaster = VARS.INPUTS_ENGINE.setCollisionRaycasterFromArbitraryPosition(position, new THREE.Vector3(0, VARS.MAX_SCENE_HEIGHT, 0.01).normalize())
        const intersectedPoints = raycaster.intersectObject(this.pointGroup, true);
        const uniques = [...new Map(intersectedPoints.map(item => [item["index"], item])).values()]
        console.log(uniques);



    }
}