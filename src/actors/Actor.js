import * as THREE from 'three';


export class Actor {
    constructor({ id }) {
        this.id = id;
        this.uniforms = {};
        this.geometry = null;
        this.material = null;
        this.model = null;
    }

    _init() { console.error("_init() method is not defined"); }

    update() { console.error("update() method is not defined"); }

    generateGeometry() { console.error("generateGeometry() method is not defined"); }

    generateMaterial() { console.error("generateMaterial() method is not defined"); }

    generateMesh() { console.error("generateMesh() method is not defined"); }

    parseData() { console.error("parseData() method is not defined"); }

    loadParsedData() { console.error("loadParsedData() method is not defined"); }

    loadPreviousState() { console.error("loadPreviousState() method is not defined"); }

    loadNextState() { console.error("loadNextState() method is not defined"); }

    applyImportedData() { console.error("applyImportedData() method is not defined"); }

    setValue(paramName, parameterVal) {
        this.uniforms[paramName] = { value: parameterVal };
    }

    getValue(paramName) {
        let output = this.uniforms[paramName].value;
        return output;
    }

}