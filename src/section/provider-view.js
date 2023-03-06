import { note, cancel, confirm, spinner } from '@clack/prompts'
import color from 'picocolors'
import logSymbols from 'log-symbols'
import { convertToSnakeCase } from '../utils'
import { addPackage } from '../flutter'
import { createProvider } from '../states/provider'
export default async function providerView (nameState) {
  note(
        `State Manage: ${color.bold('Provider')}\nName State: ${color.bold(
          nameState
        )} \n\n${color.bold('Packages to install')} \n${color.bold(
          `${logSymbols.info} provider`
        )}\n\n${color.bold('Files to create')} \n${color.bold(
          `${logSymbols.info} ${convertToSnakeCase(nameState)}_provider.dart`
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
  await addPackage(['provider'])
  createProvider(nameState)

  s.stop('Installed via flutter pub get, see pubspec.yaml')
}
