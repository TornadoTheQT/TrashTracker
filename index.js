import { Huds } from "../Krun/Huds"
import PogObject from "../PogData"
import { GREAT_JUNK_REGEX, GOOD_JUNK_REGEX } from "./functions/registerTrashDrop";

const data = new PogObject("TrashTracker", {"Trash Tracker": {
        "x": 0,
        "y": 0,
        "scale": 0,
        "width": 0,
        "h": 0,
        "drops": {
            "coins": 1,
            "belts": 0,
            "boots": 0
        }
    }})
const huds = new Huds(data)
/** @type {Gui} */
const gui = huds.gui

let myItems = ["&6&lTracker Hud", "\n&2Rusty Coins&f: 0", "\n&9Busted Belt Buckle&f: 0"]

const trackerHud = huds.createTextHud("Trash Tracker", 240, 25, myItems.join(""));

trackerHud.onDraw((x, y, str) => {
    Renderer.translate(x, y)
    Renderer.scale(trackerHud.getScale())
    Renderer.drawStringWithShadow(str, 0, 0)
    Renderer.finishDraw()
})

register("command", () => {
    huds.open()
}).setName("movehud")

register("command", () => {
    addLine("\n&cadded test")
}).setCommandName("add");

register("command", (line) => {
    removeLine(line)
}).setCommandName("remove");

register("renderOverlay", () => {
    if (huds.isOpen()) return

    Renderer.translate(trackerHud.getX(), trackerHud.getY())
    Renderer.scale(trackerHud.getScale())
    Renderer.drawStringWithShadow(trackerHud.text, 0, 0)
    Renderer.finishDraw()
})

register("gameUnload", () => {
    huds.save()
    data.save()
})

register("command", () => {
    data.save()
}).setCommandName("save")

register("chat", (item, event) => {
    if(item.equals("&aRusty Coin&r&f")) addOne(2)
}).setCriteria(GOOD_JUNK_REGEX + "&fYou caught a &r${item}!").setContains();
  
register("chat", (item, event) => {
    if(item.equals("&9Busted Belt Buckle&r&f")) addOne(3)
}).setCriteria(GREAT_JUNK_REGEX + "&fYou caught a &r${item}!").setContains();

const addLine = (text) => trackerHud.text += text;
const removeLine = (idx) => { 
    myItems.splice(idx-1, 1);
    trackerHud.text = myItems;
}
const editLine = (idx, text) => trackerHud[idx-1] = text;
const addOne = (idx) => {
    let number = myItems[idx-1].match(/: (\d+)$/);
    number = number ? parseInt(number[1], 10): null;
    myItems[idx-1] = myItems[idx-1].replace(/: \d+$/, `: ${number+1}`);
    trackerHud.text = myItems.join("");
}

//good message title
register("chat", (item, event) => {
    Client.showTitle(item, ChatLib.getChatMessage(event, true), 2.5, 27.5, 10)

}).setChatCriteria("&r&5⛃ &r&5&lGOOD &r&2&lJUNK&r&5&l CATCH! &r&fYou caught a ${item}&f!&r")

//great message title
register("chat", (item, event) => {
    Client.showTitle(item, ChatLib.getChatMessage(event, true), 2.5, 27.5, 10)

}).setChatCriteria("&r&6⛃ &r&6&lGREAT &r&2&lJUNK&r&6&l CATCH! &r&fYou caught a ${item}&f!&r")