import { Render3D } from "../../tska/rendering/Render3D"

export function hotspotWaypoint(text, x, y, z) {
    Render3D.renderWaypoint("&d&l" + text, x, y, z, 255, 85, 255, 255)
}


