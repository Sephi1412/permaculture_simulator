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
        this.chunks = {};
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
        this.chunks[chunkId] = chunk;
        VARS.SCENE.add(chunk.model);

    }

    updateActors() {
        const chunksIDs = Object.keys(this.chunks);
        chunksIDs.forEach(chunkID => {
            this.chunks[chunkID].update();
        });
    }
}