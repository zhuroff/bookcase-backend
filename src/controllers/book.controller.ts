import { Request, Response } from 'express'
import bookService from '../services/book.service'

class BookController {
  async list(req: Request, res: Response) {
    try {
      const response = await bookService.list(req)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async page(req: Request, res: Response) {
    try {
      const response = await bookService.page(String(req.params['id']))
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async setPreCover(req: Request, res: Response) {
    try {
      const response = await bookService.upload(req)
      res.json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const response = await bookService.update(req.body, req.params['id'])
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const response = await bookService.remove(req.params['id'])
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}

// const cleanPreCoverField = (id: string) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await Book.updateOne({ _id: id }, { $set: { preCoverImage: '' } })
//       resolve(true)
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

// const create = async (req: Request, res: Response) => {
//   const payload = {
//     title: '',
//     isDraft: true
//   }

//   const book = new Book(payload)

//   try {
//     await book.save()
//     res.status(201).json(book)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// const removePreCover = async (req: Request, res: Response) => {
//   Book.findById(req.params.id, { preCoverImage: true })
//     .then((book: any) => book.preCoverImage)
//     .then((filename: string) => {
//       removeMediaFile(filename)
//       cleanPreCoverField(req.params.id)
//         .then(() => res.json({ success: true }))
//     })
//     .catch((error: Error) => res.status(500).json(error))
// }

// const setArticleImage = async (req: Request, res: Response) => {
//   try {
//     const image = (req as MulterRequest).file
//       ? `/uploads/articles/${(req as MulterRequest).file.filename}`
//       : null

//     res.json({ articleImage: image })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// const removeArticleImage = async (req: Request, res: Response) => {
//   const payload = JSON.parse(req.body.urls)

//   try {
//     const deletedImages = payload.map((el: string) => (
//       removeMediaFile(el)
//     ))

//     res.json({ deleted: deletedImages })
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// // const deleteBook = async (req: Request, res: Response) => {
// //   interface categoryDict {
// //     model: PaginateModel<any> | Model<any, {}, {}>
// //     identificators: ObjectId[]
// //   }

// //   const bookConfig = {
// //     authors: true,
// //     publishers: true,
// //     genres: true,
// //     series: true,
// //     coverImage: true,
// //     lists: true
// //   }

// //   try {
// //     const bookInstance: BookDocument = await Book.findById(req.params.id, bookConfig).lean()

// //     const categories = [
// //       {
// //         model: Author,
// //         identificators: bookInstance.authors.map((el: BookAuthor) => el.author)
// //       },

// //       {
// //         model: Publisher,
// //         identificators: bookInstance.publishers.map((el: BookPublisher) => el.publisher)
// //       },

// //       {
// //         model: Genre,
// //         identificators: bookInstance.genres
// //       },

// //       {
// //         model: Series,
// //         identificators: [bookInstance.series]
// //       },

// //       // {
// //       //   model: List,
// //       //   identificators: []
// //       // }
// //     ]

// //     const cleaningCategories = categories.map(async (category: categoryDict) => {
// //       const resultCategory = await Promise.all(category.identificators.map(async (id: ObjectId) => {
// //         if (id) {
// //           const categoryInstance = await category.model.findById(id).lean()
// //           const targetBookIndex = categoryInstance.books.findIndex((el: string) => el.toString() === req.params.id)

// //           if (targetBookIndex > -1) {
// //             categoryInstance.books.splice(targetBookIndex, 1)

// //             const $set = { books: categoryInstance.books }

// //             await category.model.findOneAndUpdate({
// //               _id: id
// //             }, { $set }, { new: true })
// //           }

// //           return categoryInstance
// //         }

// //         return null
// //       }))

// //       return resultCategory
// //     })

// //     await Promise.all(cleaningCategories)
// //     await Book.deleteOne({ _id: req.params.id })

// //     res.json({ message: 'Книга успешно удалена' })
// //   } catch (error) {
// //     res.status(500).json(error)
// //   }
// // }

export default new BookController()
