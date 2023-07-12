export type FileData = {
  fileName: string,
  file: Buffer,
  mimeType: string
}

export type FileUploadParams = {
  enterpriseId: string,
  templateInputId: string,
}