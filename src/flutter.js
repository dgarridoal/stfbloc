import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'fs'

const execAsync = promisify(exec)

export function isFlutterProject () {
  return fs.existsSync('pubspec.yaml')
}

export async function addPackage ([...names]) {
  await execAsync(`flutter pub add ${names.join(' ')}`)
  await execAsync('flutter pub get')
}
