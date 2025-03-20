export function isInBayou() {
    for (let i = 0; i < Scoreboard.getLines().length; i++) {
        if (Scoreboard.getLines()[i].getName().removeFormatting().includes('Bayou')) return true
    }
    return false;
}