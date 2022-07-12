import { Request, Response } from 'express'
import { List } from '../models/list.model'
import { ListModel } from '../types/List'
// import { CategoryItemDTO } from '../dto/category.dto'
import categoryService from '../services/category.service'

class ListController {
  async list(req: Request, res: Response) {
    try {
      const response = await categoryService.list<ListModel>(req, List)

      res.status(200).json({
        ...response,
        docs: response.docs // response.docs.map((doc) => new CategoryItemDTO(doc))
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new ListController()

// const listsCollections = async (req: Request, res: Response) => {
//   try {
//     const response = await getCategories(req, List)
//     res.json(response)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// const listShort = async (req: Request, res: Response) => {
//   try {
//     const filter = {
//       'lists.title': true,
//       'lists._id': true
//     }
//     const response = await List.findById(req.params.id, filter)
//     res.json(response)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

// const listFull = async (req: Request, res: Response) => {
//   try {
//     const response = await List.findById(req.params.id)
//       .populate({
//         path: 'lists.contents.book',
//         select: [
//           '_id',
//           'title',
//           'subtitle',
//           'coverImage',
//           'status'
//         ],
//         populate: [
//           { path: 'authors.author', select: ['title', '_id'] }
//         ]
//       })
//     res.json(response)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }
