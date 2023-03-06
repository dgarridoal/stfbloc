import { intro, outro } from '@clack/prompts'
import color from 'picocolors'
import { isFlutterProject } from '../flutter'
export default function welcome () {
  intro(
    color.inverse(
          ` Welcome to choose SState Manager for Flutter by ${color.cyan(' MrCajuka ')}`
    )
  )
  if (!isFlutterProject()) {
    outro(color.red("Error: You aren't in a flutter project"))
    return process.exit(1)
  }
}
