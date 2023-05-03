export function getUserName(fullName, showLastName) {
  const splitName = fullName.split(' ')
  const lastName =
    splitName.length > 0 && showLastName ? splitName[splitName.length - 1] : ''
  return `${splitName[0]} ${lastName}`
}
