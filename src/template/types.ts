export type InputsType = {
  id: number,
  name: string,
  accept: string,
  file?: {
    contentType: string,
    fileName: string,
    location: string,
    key: string,
    size: number
  }
}