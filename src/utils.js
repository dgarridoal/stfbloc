
export const convertToCammelCase = (name) => {
  const words = name.trim().split('_')
  let result = ''
  words.forEach((word) => {
    result += word[0].toUpperCase() + word.substring(1)
  })
  return result
}
export const convertToSnakeCase = (name) => {
  const words = name.trim().split(/(?=[A-Z])/)
  let result = ''
  words.forEach((word) => {
    result += word.toLowerCase() + '_'
  })
  return result.substring(0, result.length - 1)
}
