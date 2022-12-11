import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Order } from '../../models'
import { Codes } from '../../types'
import {
	createErrorMessage,
	createSuccessMessage,
} from '../../helpers/messages'

export const deleteOrder = (req: Request, res: Response) => {
	const id = req.params._id

	// TODO: Add check on admin level 2

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const idAsObjectId = new Types.ObjectId(id)

	Order.deleteOne({ _id: idAsObjectId }, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res
			.status(Codes.OK)
			.json(createSuccessMessage(`Order ${id} successfully deleted`))
	})
}
