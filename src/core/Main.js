import { Game } from "./Game";
import { VARS } from "./Global";

export function generateScene() {
    VARS.MAIN = new Game({ mode: "FREE_MODE", menuSelectionData: null })
}

