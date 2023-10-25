import welcome from './section/welcome.js'
import nameState from './section/name-state.js'
import proyectType from './section/proyect-type.js'
import blocView from './section/bloc-view.js'
import cubitView from './section/cubit-view.js'
import providerView from './section/provider-view.js'

async function main () {
  welcome()
  const name = nameState()

  const proyect = proyectType()

  // State: BLoC
  if (proyect === 'bloc') {
    blocView(name)
  }

  // State: Cubit
  if (proyect === 'cubit') {
    cubitView(name)
  }

  // State: Provider
  if (proyect === 'provider') {
    providerView(name)
  }
}

main().catch(console.error)
