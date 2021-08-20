const { badRequestErrorText, notFoundErrorText } = require('../configs/errorTexts');
const BadRequestError = require('../errorTypes/BadRequestError');
const NotFoundError = require('../errorTypes/NotFoundError');
const Movie = require('../models/Task');

// добавление задачи
const addTask = (req, res, next) => {
  Task.create(req)
    .then((task) => {
      if (!task) {
        throw new BadRequestError(badRequestErrorText);
      }
      return res.send(task);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestErrorText));
      }
      next(err);
    });
};

// редактирование задачи
const editTask = (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id)
    .then((task) => {
      if (!task) {
        throw new BadRequestError(notFoundErrorText);
      }
      return res.send(task);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestErrorText));
      }
      next(err);
    });
};

// запрос всех задач за нужную дату
const getTasks = (req, res, next) => Task.find({})
  .then((tasks) => res.send(tasks.filter(task => task.date == req.date)))
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError(badRequestErrorText);
    }
    next(err);
  });

// удаление задачи
const deleteTask = (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) {
        throw new NotFoundError(notFoundErrorText);
      }
      return task;
    })
    .then(task => task.remove())
    .then(task => res.send(task))
    .catch(next);
};

module.exports = {
  deleteTask, getTasks, addTask, editTask
}