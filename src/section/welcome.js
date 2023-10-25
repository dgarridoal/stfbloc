import { intro, outro } from "@clack/prompts";
import color from "picocolors";
import { isFlutterProject } from "../flutter.js";
export default function welcome() {
  intro(
    color.inverse(
      ` Welcome to choose State Manager for Flutter by ${color.cyan(
        " MrCajuka "
      )}`
    )
  );
  if (!isFlutterProject()) {
    outro(color.red("Error: You aren't in a flutter project"));
    return process.exit(1);
  }
}
