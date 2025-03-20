import { Huds } from "../Krun/Huds";
import PogObject from "../PogData";
import {
  GREAT_JUNK_REGEX,
  GOOD_JUNK_REGEX,
} from "./functions/registerTrashDrop";
import { updateLines } from "./functions/updateDrops";
import { isInBayou } from "./functions/isInBayou";
import { findHotspots } from "./functions/findHotspots";

const prefix = "&6&lTrash Tracker\n";
let bool = false

const pogObject = new PogObject("TrashTracker", {
  drops: [0, 0, 0, 0],
});

const huds = new Huds(pogObject);

/** @type {Gui} */
const gui = huds.gui;

const trackerHud = huds.createTextHud(
  "Trash Tracker",
  225,
  20,
  prefix + updateLines(pogObject.drops)
);

register("command", () => {
  huds.open();
}).setName("movehud");

register("renderOverlay", () => {
  if (huds.isOpen() || !isInBayou()) return;

  Renderer.translate(trackerHud.getX(), trackerHud.getY());
  Renderer.scale(trackerHud.getScale());
  Renderer.drawStringWithShadow(trackerHud.text, 0, 0);
  Renderer.finishDraw();
});

register("worldLoad", () => {
  register("renderOverlay", () => {
    if (huds.isOpen() || !isInBayou()) return;

    Renderer.translate(trackerHud.getX(), trackerHud.getY());
    Renderer.scale(trackerHud.getScale());
    Renderer.drawStringWithShadow(trackerHud.text, 0, 0);
    Renderer.finishDraw();
  });
});

register("gameUnload", () => {
  huds.save();
  pogObject.save();
});

register("chat", (item, event) => {
  if (item.equals("&aRusty Coin&r&f")) {
    Client.showTitle(item, ChatLib.getChatMessage(event, true), 2.5, 27.5, 10);
    pogObject.drops[0] += 1;
    pogObject.save();
    trackerHud.text = prefix + updateLines(pogObject.drops);
  }
})
  .setCriteria(GOOD_JUNK_REGEX + "&fYou caught a &r${item}!")
  .setContains();

register("chat", (item, event) => {
  if (item.equals("&9Busted Belt Buckle&r&f")) {
    Client.showTitle(item, ChatLib.getChatMessage(event, true), 2.5, 27.5, 10);
    pogObject.drops[3] += 1;
    pogObject.save();
    trackerHud.text = updateLines(pogObject.drops);
  }
})
  .setCriteria(GREAT_JUNK_REGEX + "&fYou caught a &r${item}!")
  .setContains();



register("command", () => bool = !bool).setName("hotspot")

register("renderWorld", () => {
    if (!bool) return;
    findHotspots()
})