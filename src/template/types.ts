export type InputsType = {
  id: number,
  name: string,
  accept: string,
  file?: {
    location: string,
    key: string
  }
}