import md5 from 'md5'

export function getGravatar(email) {
  return `https://gravatar.com/avatar/${md5(email)}?d=mp`
}
