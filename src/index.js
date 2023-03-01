import logSymbols from 'log-symbols'
import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
  note
} from '@clack/prompts'
import { setTimeout as sleep } from 'node:timers/promises'
import color from 'picocolors'
import { convertToSnakeCase } from './utils.js'
import { isFlutterProject } from './flutter.js'
import { createBloc } from './states/bloc.js'
import { createCubit } from './states/cubit.js'
import { createProvider } from './states/provider.js'
import { execSync } from 'node:child_process'

async function main () {
  intro(
    color.inverse(
      ` Welcome to State Manager for Flutter by ${color.cyan(' MrCajuka ')}`
    )
  )
  if (!isFlutterProject()) {
    outro(color.red("Error: You aren't in a flutter project"))
    return process.exit(1)
  }

  const nameState = await text({
    message: color.cyan('What is the name for the state?'),
    placeholder: 'you name state',
    validate: (value) => {
      if (!value) {
        return 'Name is required'
      }
    }
  })

  if (isCancel(nameState)) {
    cancel(`${logSymbols.error} Operation cancelled`)
    return process.exit(0)
  }

  const projectType = await select({
    message: color.cyan('Pick a state type.'),
    options: [
      { value: 'bloc', label: 'BLoC' },
      { value: 'cubit', label: 'BLoC Cubit' },
      { value: 'provider', label: 'Provider' }
    ]
  })

  if (isCancel(projectType)) {
    cancel(`${logSymbols.error} Operation cancelled`)
    return process.exit(0)
  }

  // State: BLoC
  if (projectType === 'bloc') {
    const blocType = await select({
      message: 'Pick a bloc type.',
      initialValue: 'equatable',
      options: [
        { value: 'equatable', label: 'With Equatable' },
        { value: 'non-equatable', label: 'Non Equatable' }
      ]
    })

    if (isCancel(blocType)) {
      cancel(`${logSymbols.error} Operation cancelled`)
      return process.exit(0)
    }

    note(
      `State Manage: ${color.bold('BLoC')} \nEquatable: ${color.bold(
        blocType === 'equatable' ? 'Yes' : 'No'
      )} \nName State: ${color.bold(nameState)} \n\n${color.bold(
        'Packages to install'
      )} \n${color.bold(`${logSymbols.info} bloc`)} \n${color.bold(
        `${logSymbols.info} flutter_bloc`
      )} ${
        blocType === 'equatable'
          ? `\n${color.bold(`${logSymbols.info} equtable`)}`
          : ''
      } \n\n${color.bold('Files to create')} \n${color.bold(
        `${logSymbols.info} ${convertToSnakeCase(nameState)}_bloc.dart`
      )} \n${color.bold(
        `${logSymbols.info} ${convertToSnakeCase(nameState)}_event.dart`
      )} \n${color.bold(
        `${logSymbols.info} ${convertToSnakeCase(nameState)}_state.dart`
      )}`,
      color.cyan('Summary before installation')
    )

    const shouldContinue = await confirm({
      message: 'Do you want to continue?'
    })

    if (!shouldContinue) {
      cancel(`${logSymbols.error} Operation cancelled`)
      return process.exit(0)
    }

    const s = spinner()
    s.start('Installing via flutter pub get')
    if (blocType === 'equatable') {
      execSync(
        'flutter pub add flutter_bloc && flutter pub add equatable && flutter pub add bloc && flutter pub get'
      )
      createBloc(nameState, true)
    } else {
      execSync(
        'flutter pub add flutter_bloc && flutter pub add bloc && flutter pub get'
      )
      createBloc(nameState, false)
    }
    s.stop('Installed via flutter pub get, see pubspec.yaml')
  }

  // State: BLoC Cubit
  if (projectType === 'cubit') {
    const blocType = await select({
      message: 'Pick a cubit type.',
      initialValue: 'equatable',
      options: [
        { value: 'equatable', label: 'With Equatable' },
        { value: 'non-equatable', label: 'Non Equatable' }
      ]
    })

    if (isCancel(blocType)) {
      cancel(`${logSymbols.error} Operation cancelled`)
      return process.exit(0)
    }

    // TODO: Crear una info para mostrar los paquetes que se van a instalar
    note(
      `State Manage: ${color.bold('Cubit')} \nEquatable: ${color.bold(
        blocType === 'equatable' ? 'Yes' : 'No'
      )} \nName State: ${color.bold(nameState)} \n\n${color.bold(
        'Packages to install'
      )} \n${color.bold(`${logSymbols.info} bloc`)} \n${color.bold(
        `${logSymbols.info} flutter_bloc`
      )}  ${
        blocType === 'equatable'
          ? `\n${color.bold(`${logSymbols.info} equtable`)}`
          : ''
      } \n\n${color.bold('Files to create')} \n${color.bold(
        `${logSymbols.info} ${convertToSnakeCase(nameState)}_cubit.dart`
      )} \n${color.bold(
        `${logSymbols.info} ${convertToSnakeCase(nameState)}_state.dart`
      )}`,
      'Summary before installation'
    )

    const shouldContinue = await confirm({
      message: 'Do you want to continue?'
    })

    if (!shouldContinue) {
      cancel(`${logSymbols.error} Operation cancelled`)
      return process.exit(0)
    }

    const s = spinner()
    s.start('Installing via flutter pub get')
    if (blocType === 'equatable') {
      execSync(
        'flutter pub add flutter_bloc && flutter pub add equatable && flutter pub add bloc && flutter pub get'
      )
      createCubit(nameState, true)
    } else {
      execSync(
        'flutter pub add flutter_bloc && flutter pub add bloc && flutter pub get'
      )
      createCubit(nameState, false)
    }
    s.stop('Installed via flutter pub get, see pubspec.yaml')
  }

  // State: Provider
  if (projectType === 'provider') {
    // TODO: Crear una info para mostrar los paquetes que se van a instalar
    note(
      `State Manage: ${color.bold('Provider')}\nName State: ${color.bold(
        nameState
      )} \n\n${color.bold('Packages to install')} \n${color.bold(
        `${logSymbols.info} provider`
      )}\n\n${color.bold('Files to create')} \n${color.bold(
        `${logSymbols.info} ${convertToSnakeCase(nameState)}_provider.dart`
      )}`,
      'Summary before installation'
    )

    const shouldContinue = await confirm({
      message: 'Do you want to continue?'
    })

    if (!shouldContinue) {
      cancel(`${logSymbols.error} Operation cancelled`)
      return process.exit(0)
    }

    const s = spinner()
    s.start('Installing via flutter pub get')
    execSync('flutter pub add provider && flutter pub get')
    createProvider(nameState)

    s.stop('Installed via flutter pub get, see pubspec.yaml')
  }
  outro(
    color.cyan(
      `${logSymbols.success} You're all set!. Thanks for use this tool`
    )
  )
}
await sleep(1000)

main().catch(console.error)
