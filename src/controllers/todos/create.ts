import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Todo } from 'orm/entities/todos/Todo';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const task = req.body;
  const todoRepository = getRepository(Todo);
  try {
    const todo = todoRepository.create({
      content: task.content,
      isComplete: false,
    });
    await todoRepository.save(todo);
    res.status(200).json(todo.id);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of todo.`, null, err);
    return next(customError);
  }
};
