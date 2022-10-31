export const passwordMinLength = 8
export const passwordMaxLength = 16

export function validateEmail(mail) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return mail.match(regex)
}

export function isValidLogin({ email, password }) {
  if (!validateEmail(email)) return false
  if (password.length <= 8 || password.length > passwordMaxLength) return false
  return true
}
