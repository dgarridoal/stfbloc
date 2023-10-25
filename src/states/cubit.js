import { writeFile } from 'fs'
import { convertToCammelCase, convertToSnakeCase } from '../utils.js'

export const createCubit = (name, isEquatable) => {
  const contentCubitNon = `
      import 'package:bloc/bloc.dart';
  
      part '${convertToSnakeCase(name)}_state.dart';
  
      class ${convertToCammelCase(name)}Cubit extends Cubit<${convertToCammelCase(
      name
    )}State> {
          ${convertToCammelCase(name)}Cubit() : super(${convertToCammelCase(
      name
    )}Initial()) {
          }
      }`

  const contentStateNon = `
      part of '${convertToSnakeCase(name)}_cubit.dart';
  
      @immutable
      abstract class ${convertToCammelCase(name)}State {}
  
      class ${convertToCammelCase(name)}Initial extends ${convertToCammelCase(
      name
    )}State {}
      `
  const contentCubitEquatable = `
      import 'package:bloc/bloc.dart';
      import 'package:equatable/equatable.dart';
  
      part '${convertToSnakeCase(name)}_state.dart';
  
      class ${convertToCammelCase(name)}Cubit extends Cubit<${convertToCammelCase(
      name
    )}State> {
          ${convertToCammelCase(name)}Cubit() : super(${convertToCammelCase(
      name
    )}Initial()) {
          }
      }`

  const contentStateEquatable = `
      part of '${convertToSnakeCase(name)}_cubit.dart';
  
      @immutable
      abstract class ${convertToCammelCase(name)}State extends Equatable {
          const ${convertToCammelCase(name)}State();
      }
  
      class ${convertToCammelCase(name)}Initial extends ${convertToCammelCase(
      name
    )}State {
          const ${convertToCammelCase(name)}Initial();
      }`

  const contentCubit = isEquatable ? contentCubitEquatable : contentCubitNon
  const contentState = isEquatable ? contentStateEquatable : contentStateNon

  writeFile(
      `./lib/cubits/${convertToSnakeCase(name)}/${convertToSnakeCase(
        name
      )}_cubit.dart`,
      contentCubit,
      (err) => {
        if (err) {
          console.log(err)
        }
      }
  )

  writeFile(
      `./lib/cubits/${convertToSnakeCase(name)}/${convertToSnakeCase(
        name
      )}_state.dart`,
      contentState,
      (err) => {
        if (err) {
          console.log(err)
        }
      }
  )
}
