import { note, isCancel, cancel, select, confirm, spinner } from '@clack/prompts'
import color from 'picocolors'
import logSymbols from 'log-symbols'
import { convertToSnakeCase } from '../utils'
import { addPackage } from '../flutter'
import { createCubit } from '../states/cubit'

export default async function cubitView (nameState) {
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
    await addPackage(['equatable', 'bloc', 'flutter_bloc'])
    createCubit(nameState, true)
  } else {
    await addPackage(['bloc', 'flutter_bloc'])
    createCubit(nameState, false)
  }
  s.stop('Installed via flutter pub get, see pubspec.yaml')
}
