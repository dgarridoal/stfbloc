
export const convertToCammelCase = (name) => {
  // Eliminar caracteres especiales y convertir a minúsculas
  name = name.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()

  // Separar palabras por guiones bajos y convertir primera letra de cada palabra en mayúscula
  name = name.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase()
  })

  // Convertir primera letra a mayúscula
  name = name.charAt(0).toUpperCase() + name.slice(1)

  return name
}
export const convertToSnakeCase = (name) => {
  // Eliminar caracteres especiales y convertir a minúsculas
  name = name.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()

  // Reemplazar espacios y guiones por guiones bajos
  name = name.replace(/\s+/g, '_').replace(/-+/g, '_')

  return name
}
