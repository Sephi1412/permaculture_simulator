import * as THREE from 'three';
import { VARS } from "./Global";
import { OrbitControls } from "../modules/OrbitControls.js";



let widthContainer, heightContainer, gameContainer;

export class GraphicsEngine {
    constructor(fov = 45) {
        this.fov = fov;
        this.actors = {};
        widthContainer = getVW(98);  // % of the container's width
        heightContainer = getVH(96); // % of the container's height
        // this._init();
    }

    setCurrentScene(scene) {
        this.currentScene = scene;
        this.addAmbientLight();
        this.defineLight();
        this.addSpotlight();
    }

    getCurrentScene() {
        return this.currentScene;
    }

    getRenderer() {
        return this.renderer;
    }

    getCamera() {
        return this.camera;
    }

    getContainer() {
        return this.container;
    }

    _init() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.domElement.id = "canvas-game-container"
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(widthContainer, heightContainer);

        gameContainer = document.getElementById("game-container");
        gameContainer.innerHTML = "";
        gameContainer.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(60, widthContainer / heightContainer, 0.1, 1000);

        window.addEventListener("resize", () => {
            setWindowSize(this.camera, this.renderer);
        });

        this.setCurrentScene(new THREE.Scene());
        this.setUpCamera();

        VARS.RENDERER = this.renderer;
        VARS.CAMERA = this.camera;
        VARS.SCENE = this.getCurrentScene();
        VARS.SCENE.background = new THREE.Color(0xa8def0);
        // this.addLightHelper();
    }

    setUpCamera() {
        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(10, 15, -22);
        this.orbit.update();
    }

    renderCurrentScene() {
        this.renderer.render(this.currentScene, this.camera);
    }

    addAmbientLight() {
        let ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        ambientLight.castShadow = false;

        this.currentScene.add(ambientLight);
    }

    addSpotlight() {
        let spotLight = new THREE.SpotLight(0xffffff, 0.55);
        spotLight.castShadow = true;
        spotLight.position.set(0, 40, 10);
        this.currentScene.add(spotLight);
    }

    defineLight() {
        let light = new THREE.DirectionalLight(0xFFFFFF, 1, 100);
        light.position.set(500, 40, 1000);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        this.currentScene.add(light);

        this.light = light;
    }

    addActor({ actor, actorMesh, actorName }) {
        // actorMesh.name = actorName;
        this.currentScene.add(actorMesh);
        VARS.ACTORS[actorName] = actor;
        VARS.SCENE_MANAGER[actorName] = {};
        // const parsedData = actor.parseData();
        // console.log(parsedData);
    }

    addLightHelper() {
        const helper = new THREE.DirectionalLightHelper( this.light, 5 );
        this.currentScene.add( helper );
    }
}

export function getVH(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

export function getVW(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}

const setWindowSize = (camera, renderer) => {
    widthContainer = getVW(98);
    heightContainer = getVH(96);
    camera.aspect = widthContainer / heightContainer;
    camera.updateProjectionMatrix();
    renderer.setSize(widthContainer, heightContainer);
};