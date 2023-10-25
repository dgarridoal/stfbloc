import { select, isCancel, cancel } from '@clack/prompts'
import logSymbols from 'log-symbols'
import color from 'picocolors'

export default async function proyectType () {
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
  return projectType
}
