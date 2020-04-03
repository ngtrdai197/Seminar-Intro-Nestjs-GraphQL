export interface IPagination<T> {
  total?: number
  hasNext?: boolean
  hasPre?: boolean
  results: T[]
}
