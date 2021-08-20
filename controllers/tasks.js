const { badRequestErrorText, notFoundErrorText } = require('../configs/errorTexts');
const BadRequestError = require('../errorTypes/BadRequestError');
const NotFoundError = require('../errorTypes/NotFoundError');
const Task = require('../models/Task');

// добавление задачи
module.exports.addTask = (req, res, next) => Task.create(req.body)
  .then(task => {
    if (!task) {
      throw new BadRequestError(badRequestErrorText);
    }
    return res.send(task);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      next(new BadRequestError(badRequestErrorText));
    }
    next(err);
  });

// редактирование задачи
module.exports.editTask = (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(task => {
    if (!task) {
      throw new BadRequestError(notFoundErrorText);
    }
    return res.send(task);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      next(new BadRequestError(badRequestErrorText));
    }
    next(err);
  });
}

// запрос всех задач за нужную дату
module.exports.getTasks = (req, res, next) => Task.find({})
  .then(tasks => res.send(tasks))
  .catch(err => {
    if (err.name === 'CastError') {
      throw new BadRequestError(badRequestErrorText);
    }
    next(err);
  });

// удаление задачи
module.exports.deleteTask = (req, res, next) => Task.findById(req.params.id)
  .then(task => {
    if (!task) {
      throw new NotFoundError(notFoundErrorText);
    }
    return task;
  })
  .then(task => task.remove())
  .then(task => res.send(task._id))
  .catch(next);
