import { text, isCancel, cancel } from '@clack/prompts'
import color from 'picocolors'
import logSymbols from 'log-symbols'
export default async function nameState () {
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
}
