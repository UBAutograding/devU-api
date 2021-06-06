export type SchoolAuth = {
  email: string
  schoolId: string
}

export type ApiAuth = {
  token: string
}

export type DeserializedToken = {
  iat?: number
  exp?: number
  email: string
}
