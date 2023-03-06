import { setTimeout as sleep } from 'node:timers/promises'
import { outro } from '@clack/prompts'
import logSymbols from 'log-symbols'
import color from 'picocolors'

export default async function outroView () {
  outro(
    color.cyan(
          `${logSymbols.success} You're all set!. Thanks for use this tool`
    )
  )
  await sleep(1000)
}
