const router = require('express').Router();
const tasksRouter = require('./tasks');
const NotFoundError = require('../errorTypes/NotFoundError');
const { notFoundErrorText } = require('../configs/errorTexts');

router.use('/', tasksRouter);

// Обработка запроса несуществующего адреса
router.all('*', (req, res, next) => next(new NotFoundError(notFoundErrorText)));

module.exports = router;
