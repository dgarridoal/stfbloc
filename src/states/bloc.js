import { writeFile } from 'fs'
import { convertToCammelCase, convertToSnakeCase } from '../utils.js'

export const createBloc = (name, isEquatable) => {
  const contentBlocNon = `
      import 'package:bloc/bloc.dart';
      
      part '${convertToSnakeCase(name)}_event.dart';
      part '${convertToSnakeCase(name)}_state.dart';
      
      class ${convertToCammelCase(name)}Bloc extends Bloc<${convertToCammelCase(
      name
    )}Event, ${convertToCammelCase(name)}State> {
          ${convertToCammelCase(name)}Bloc() : super(${convertToCammelCase(
      name
    )}Initial()) {
          on<${convertToCammelCase(name)}Event>((event, emit) {
            // TODO: implement event handler
          });
        }
      }`

  const contentEventNon = `
      part of '${convertToSnakeCase(name)}_bloc.dart';
  
      @immutable
      abstract class ${convertToCammelCase(name)}Event {}`

  const contentStateNon = `
      part of '${convertToSnakeCase(name)}_bloc.dart';
  
      @immutable
      abstract class ${convertToCammelCase(name)}State {}
  
      class ${convertToCammelCase(name)}Initial extends ${convertToCammelCase(
      name
    )}State {}
  
      `
  const contentBlocEquatable = `
      import 'package:bloc/bloc.dart';
      import 'package:equatable/equatable.dart';
  
      part '${convertToSnakeCase(name)}_event.dart';
      part '${convertToSnakeCase(name)}_state.dart';
  
      class ${convertToCammelCase(name)}Bloc extends Bloc<${convertToCammelCase(
      name
    )}Event, ${convertToCammelCase(name)}State> {
          ${convertToCammelCase(name)}Bloc() : super(${convertToCammelCase(
      name
    )}Initial()) {
              on<${convertToCammelCase(name)}Event>((event, emit) {
                  // TODO: implement event handler
              });
          }
      }`

  const contentEventEquatable = `
      part of '${convertToSnakeCase(name)}_bloc.dart';
  
      @immutable
      abstract class ${convertToCammelCase(name)}Event extends Equatable {
          const ${convertToCammelCase(name)}Event();
      }`

  const contentStateEquatable = `
      part of '${convertToSnakeCase(name)}_bloc.dart';
  
      @immutable
      abstract class ${convertToCammelCase(name)}State extends Equatable {
          const ${convertToCammelCase(name)}State();
      }
      
      class ${convertToCammelCase(name)}Initial extends ${convertToCammelCase(
      name
    )}State {
          const ${convertToCammelCase(name)}Initial();
      }`

  const contentBloc = isEquatable ? contentBlocEquatable : contentBlocNon
  const contentEvent = isEquatable ? contentEventEquatable : contentEventNon
  const contentState = isEquatable ? contentStateEquatable : contentStateNon

  writeFile(
      `./lib/blocs/${convertToSnakeCase(name)}/${convertToSnakeCase(
        name
      )}_bloc.dart`,
      contentBloc,
      (err) => {
        if (err) {
          console.log(err)
        }
      }
  )

  writeFile(
      `./lib/blocs/${convertToSnakeCase(name)}/${convertToSnakeCase(
        name
      )}_event.dart`,
      contentEvent,
      (err) => {
        if (err) {
          console.log(err)
        }
      }
  )

  writeFile(
      `./lib/blocs/${convertToSnakeCase(name)}/${convertToSnakeCase(
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
