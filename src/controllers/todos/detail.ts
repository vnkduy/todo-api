import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Todo } from 'orm/entities/todos/Todo';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const detail = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const todoRepository = getRepository(Todo);
  try {
    const todo = await todoRepository.findOne({ where: { id } });
    res.status(200).json(todo);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of todo.`, null, err);
    return next(customError);
  }
};
