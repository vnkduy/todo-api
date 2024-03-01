import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Todo } from 'orm/entities/todos/Todo';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const todoRepository = getRepository(Todo);
  try {
    const todos = await todoRepository.find({
      select: ['id', 'content', 'isComplete', 'created_at', 'updated_at'],
      order: { created_at: 'DESC' },
    });
    res.status(200).json(todos);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of todo.`, null, err);
    return next(customError);
  }
};
