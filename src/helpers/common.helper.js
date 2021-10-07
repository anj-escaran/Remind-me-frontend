export function titleCase(data) {
  let noSpace = data.split('%20').join(' ')
  let slash = noSpace.split('%2F').join('/')
  let splitStr = slash.split('-')
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join('-')
}
