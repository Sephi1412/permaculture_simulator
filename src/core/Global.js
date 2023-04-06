import { GraphicsEngine } from "./Graphics";
import { InputEngine } from "./InputEngine";

export const FRAMERATE = 60;

export const VARS = {
    FRAME_INTERVAL: 1 / FRAMERATE,
    GLOBAL_DELTA_TIME: 0,
    FLAGS: {
        MOUSE_ON_GAME: true,
        MENU_IS_OPEN: false,
    },
    MAX_IMG_SIZE: 256,
    SEGMENTS_PER_TILE: 16,
    MAX_SCENE_HEIGHT: 256, // Default Values
    MIN_SCENE_HEIGHT: -256, // Default Values
    MENUS: {},
    ACTORS: {},
    MANAGERS: {},
    MENU_SELECTION_DATA: {},
    RENDERER: null,
    SCENE: null,
    GRAPHICS: new GraphicsEngine(),
    INPUTS_ENGINE: new InputEngine(),
}

export const TERRAIN_VALUES = {
    CURSOR_SIZE: 2.0
}

export function updateActors() {
    const managerIDs = Object.keys(VARS.MANAGERS);
    managerIDs.forEach(managerID => {
        const manager = VARS.MANAGERS[managerID];
        manager.updateActors();
    });
}