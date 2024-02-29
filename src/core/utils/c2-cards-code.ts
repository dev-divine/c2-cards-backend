import { randomUUID } from 'node:crypto'

function generateExternalCode() {
  const randomCode = randomUUID()
  return `C2C-${randomCode[4].concat(randomCode[0])}`
}

export const C2CardsCode = {
  generateExternalCode,
}
