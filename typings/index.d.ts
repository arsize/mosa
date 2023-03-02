declare interface Config {
  dir_path: string
  open: string
  files: CacheFileInfo[]
  [propName: string]: string | Array
}

declare module "format-json"

declare type CacheFileInfo = {
  name: string
  path: string
  createTime?: string
  updateTime?: string
}
