import * as THREE from 'three';
import { VARS } from '../core/Global';
import { terrain_fragmentShader, terrain_VertexShader } from '../graphics/shaders/TerrainChunk';
import { Actor } from './Actor';

export class Terrain extends Actor {
    constructor({ id, width, height, widthSegments, heightSegments }) {
        super({ id: id })
        this.width = width;
        this.height = height;
        this.widthSegments = widthSegments;
        this.heightSegments = heightSegments;

        this.uniforms = {
            width: { value: width },
            height: { value: height },
            widthSegments: { value: widthSegments },
            heightSegments: { value: heightSegments },
            cursorPos: { value: new THREE.Vector3() },
            cursorRadius: { value: 1.0 },
        }

        this._init();
    }

    _init() {
        this.generateGeometry();
        this.generateMaterial();
        this.generateMesh();

    }

    update() {
        if (VARS.INPUTS_ENGINE.mouseIsMoving) {
            this.projectCursorPosition();
        }
    }

    generateGeometry() {
        this.geometry = new THREE.PlaneGeometry(16, 16, 8, 8);
        this.geometry.rotateX(-Math.PI / 2)
    }

    generateMaterial() {
        // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, wireframe: true });
        const shaderMaterial = new THREE.RawShaderMaterial({
            side: THREE.DoubleSide,
            clipIntersection: true,
            uniforms: this.uniforms,
            vertexShader: terrain_VertexShader,
            fragmentShader: terrain_fragmentShader,
            glslVersion: THREE.GLSL3,
            transparent: true,
            opacity: 0.5,
            // wireframe: true,
        });


        shaderMaterial.onBeforeCompile = function (shader) {
            shader.vertexShader = terrain_VertexShader;
            shader.fragmentShader = terrain_fragmentShader;
            shaderMaterial.needsUpdate = true;
        };


        this.material = shaderMaterial;
    }

    generateMesh() {
        this.model = new THREE.Mesh(this.geometry, this.material);
    }

    projectCursorPosition() {
        const raycaster = VARS.INPUTS_ENGINE.setRaycasterFromCamera();
        const intersects = raycaster.intersectObject(this.model);
        if (intersects.length > 0) {
            const cursorPosition = new THREE.Vector3(
                intersects[0].point.x / 1,
                intersects[0].point.y / 1,
                intersects[0].point.z / 1
            );


            this.setValue('cursorPos', cursorPosition);
            console.log(this.getValue('cursorPos'));
        }

    }
}

