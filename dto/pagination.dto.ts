export class PaginationDTO {
  totalDocs?: number
  totalPages?: number
  page?: number

  constructor(totalDocs = 1, totalPages = 1, page = 1) {
    this.totalDocs = totalDocs
    this.totalPages = totalPages
    this.page = page
  }
}
