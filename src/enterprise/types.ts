export type FileData = {
  fileName: string,
  file: Buffer,
  mimeType: string,
  size: number
}

export type FileUploadParams = {
  enterpriseId: string,
  templateInputId: string,
}