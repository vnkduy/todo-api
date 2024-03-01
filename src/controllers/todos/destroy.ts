import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Todo } from 'orm/entities/todos/Todo';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const todoRepository = getRepository(Todo);
  try {
    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Todo with id:${id} doesn't exists.`]);
      return next(customError);
    }
    await todoRepository.delete(id);

    res.status(200).json('ok');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
