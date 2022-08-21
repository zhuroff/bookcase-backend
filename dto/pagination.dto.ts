import { HydratedDocument, PaginateResult } from 'mongoose'

export class PaginationDTO<T,> {
  page: number | undefined
  totalDocs: number
  totalPages: number

  constructor(entity: PaginateResult<HydratedDocument<T, {}, {}>>) {
    this.page = entity.page
    this.totalDocs = entity.totalDocs
    this.totalPages = entity.totalPages
  }
}