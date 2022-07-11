import { PaginateResult } from 'mongoose'

export class PaginationDTO<T extends PaginateResult<any>> {
  page: number | undefined
  totalDocs: number
  totalPages: number

  constructor(entity: T) {
    this.page = entity.page
    this.totalDocs = entity.totalDocs
    this.totalPages = entity.totalPages
  }
}