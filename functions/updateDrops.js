import { Hud } from "../../Krun/Hud";
import { trashItems } from "../constants/trashDrops";
/**
 * @param {Hud} hud pogObject that is going to be updated
 * @param {Array} array array to update
 */
export function updateLines(array) {
    let lines = []
    let i = 0;
    trashItems.forEach((item) => {
        lines.push(item + ": " + array[i] + "\n")
        i++;
    })
    return lines.join("");
}