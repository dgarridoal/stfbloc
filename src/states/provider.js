import { writeFile } from 'fs'
import { convertToCammelCase } from '../utils.js'

export const createProvider = (name) => {
  const content = `
  import 'package:flutter/material.dart';
  import 'package:provider/provider.dart';
  
  class ${convertToCammelCase(name)}Provider extends ChangeNotifier {
      ${convertToCammelCase(name)}Provider() {
      }
  }
  `
  writeFile(
    `./lib/providers/${name.toLowerCase()}_provider.dart`,
    content,
    (err) => {
      if (err) {
        console.log(err)
      }
    }
  )
}
