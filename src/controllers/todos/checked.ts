import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Todo } from 'orm/entities/todos/Todo';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const checked = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const todoRepository = getRepository(Todo);
  try {
    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['Todo not found.']);
      return next(customError);
    }

    todo.isComplete = !todo.isComplete;

    try {
      await todoRepository.save(todo);
      res.status(200).json(todo.id);
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Todo '${todo.id}' can't be update.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
