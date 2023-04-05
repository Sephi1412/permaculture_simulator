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
        this.chunks = [];
        this.planeGroup = new THREE.Group();
        this.pointGroup = new THREE.Group();

        VARS.SCENE.add(this.planeGroup);
        VARS.SCENE.add(this.pointGroup);
    }

    createNewTerrain() {
        const chunkId = `terrain_chunk_${this.n_chunks}`;
        const chunk = new Terrain({
            id: chunkId,
            width: this.width,
            height: this.height,
            widthSegments: this.widthSegments,
            heightSegments: this.heightSegments
        });


        this.planeGroup.add(chunk.model);
        this.pointGroup.add(chunk.points);
        this.chunks.push(chunk);
        this.n_chunks += 1;
    }

    createNewTerrainWithOffset({ xCoord, zCoord }) {
        const chunk = new Terrain({
            chunkIndex: this.n_chunks,
            width: this.width,
            height: this.height,
            widthSegments: this.widthSegments,
            heightSegments: this.heightSegments,
            xPos: xCoord,
            zPos: zCoord
        });
        // chunk.moveTo({ xCoord: xCoord, zCoord: zCoord })
        this.planeGroup.add(chunk.model);
        this.pointGroup.add(chunk.points);
        console.log(this.pointGroup);
        this.chunks.push(chunk);
        this.n_chunks += 1;
        // console.log(planeGroup);
        // console.log(VARS.SCENE.children[3])
    }

    updateActors() {
        if (VARS.INPUTS_ENGINE.mouseIsMoving) {
            this.projectCursorPosition()
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
            this.cursorPosition = new THREE.Vector3(
                intersects[0].point.x / 1,
                intersects[0].point.y / 1,
                intersects[0].point.z / 1
            );

            // console.log(this.cursorPosition);

            this.chunks.forEach(chunk => {
                chunk.setValue("cursorPos", this.cursorPosition);
            });
            this.getVerticesOnSelectedArea();
            // 
        }
    }

    getVerticesOnSelectedArea() {
        const position = this.cursorPosition;
        const raycaster = VARS.INPUTS_ENGINE.setCollisionRaycasterFromArbitraryPosition(position, new THREE.Vector3(0, VARS.MAX_SCENE_HEIGHT, 0.01).normalize())
        // const intersects = [];
        const intersectedPoints = raycaster.intersectObject(this.pointGroup, true);
        const unique = [...new Map(intersectedPoints.map(item => [item["index"], item])).values()]
        console.log(unique);
        // unique.forEach(element => {
        //     console.log(element.object.name);
        // });
        // unique.forEach(pointObject => {
            
        // })
    }
}