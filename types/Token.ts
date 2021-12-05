type Token = string | null

interface JWToken {
  login: string
  id: string
}

export { Token, JWToken }
