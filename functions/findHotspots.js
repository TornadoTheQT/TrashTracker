import { Render3D } from "../../tska/rendering/Render3D";
import { hotspotWaypoint } from "./createWaypint";

/**
 * Stores the waypoint data and ensures rendering happens in the correct event.
 * @param {string} text The label for the waypoint.
 * @param {number} x X-coordinate.
 * @param {number} y Y-coordinate.
 * @param {number} z Z-coordinate.
 */
export function findHotspots() {
  let processedEntities = new Set();
  const allEntities = World.getAllEntitiesOfType(
    Java.type("net.minecraft.entity.item.EntityArmorStand")
  );
  let wpText = ""; // Initialize wpText to an empty string

  allEntities.forEach((entity, index) => {
    const id = entity.entity.func_145782_y();
    const name = entity.entity.func_70005_c_();

    if (!processedEntities.has(id)) {
      processedEntities.add(id);

      // Clean up name by removing formatting and converting to lowercase
      const lowerCaseName = ChatLib.removeFormatting(name.toLowerCase());

      // Check if the entity matches any relevant keywords
      if (
        lowerCaseName.includes("hotspot") ||
        lowerCaseName.includes("sea creature chance") ||
        lowerCaseName.includes("double hook chance") ||
        lowerCaseName.includes("fishing speed") ||
        lowerCaseName.includes("treasure chance")
      ) {
        // Reset wpText if it's still set to "hotspot" (to avoid creating a waypoint with "hotspot")
        if (wpText.toLowerCase() === "hotspot") {
          wpText = "";
        }

        // Append the current entity's name to wpText if it's not empty
        if (wpText === "") {
          wpText = name; // First entity name becomes the wpText
        } else {
          wpText += `\n${name}`; // Subsequent entity names are appended
        }

        // Get the entity's coordinates
        const x = entity.getX() - 0.5;
        const y = entity.getY() - 2;
        const z = entity.getZ() - 0.5;

        // Only create the waypoint if wpText is not just "hotspot"
        if (ChatLib.removeFormatting(wpText.toLowerCase()) !== "hotspot") {
          hotspotWaypoint(wpText, x, y, z);
        }
      } else {
        // If the entity doesn't match any of the keywords, reset wpText
        wpText = "";
      }
    }
  });
}
