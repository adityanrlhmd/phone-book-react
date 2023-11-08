export interface ContactInterface {
  id: number
  first_name: string
  last_name: string
  phones: {
    number: string
  }[]
}