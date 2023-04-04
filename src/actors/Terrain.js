import * as THREE from 'three';
import { TERRAIN_VALUES, VARS } from '../core/Global';
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
            cursorRadius: { value: TERRAIN_VALUES.CURSOR_SIZE },
        }

        this._init();
    }

    _init() {
        this.generateGeometry();
        this.generateMaterial();
        this.generateMesh();
        this.setVertexColors();
        this.generatePoints();

    }

    update() {
        if (VARS.INPUTS_ENGINE.mouseIsMoving) {
            this.projectCursorPosition();
        }

        if (VARS.INPUTS_ENGINE.keysArePressed("LEFT_CLICK") && VARS.INPUTS_ENGINE.heldTimers["LEFT_CLICK"] == 0.0) {
            this.onClickFunction();
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

    generatePoints() {
        this.pointsMaterial = new THREE.PointsMaterial({ vertexColors: true, visible: false });
        this.points = new THREE.Points(this.geometry, this.pointsMaterial);


    }

    setVertexColors() {
        const colors = [];
        const geometry = this.geometry
        const n_vertices = geometry.attributes.position.count;
        for (let i = 0; i < n_vertices; i++) {
            colors.push(1.0, 1.0, 1.0);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.attributes.color.needsUpdate = true;
    }

    projectCursorPosition() {
        const raycaster = VARS.INPUTS_ENGINE.setCursorRaycasterFromCamera();
        const intersects = raycaster.intersectObject(this.model);
        if (intersects.length > 0) {
            const cursorPosition = new THREE.Vector3(
                intersects[0].point.x / 1,
                intersects[0].point.y / 1,
                intersects[0].point.z / 1
            );
            


            this.setValue('cursorPos', cursorPosition);
            this.onClickFunction();
        }

    }

    onClickFunction() {
        const position = this.getValue('cursorPos');
        const raycaster = VARS.INPUTS_ENGINE.setCollisionRaycasterFromArbitraryPosition(position, new THREE.Vector3(0, VARS.MAX_SCENE_HEIGHT, 0.01).normalize())
        // const raycaster = VARS.INPUTS_ENGINE.setCursorRaycasterFromCamera();
        const intersects = [];
        const uniquePointsIDs = [];

        this.points.raycast(raycaster, intersects);
        // Filter Repeated Values
        const unique = [...new Map(intersects.map(item => [item["index"], item])).values()]
        this.setVertexColors();
        unique.forEach(pointObject => {
            const index = pointObject.index;
            this.setActiveVertexColor(index);
        })

        
    }

    setActiveVertexColor(vertexId) {
        this.geometry.attributes.color.setXYZ(vertexId, 1.0, 0.0, 0.0);
    }



}

