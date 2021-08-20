const router = require('express').Router();
const { addTask, deleteTask, getTasks, editTask } = require('../controllers/tasks');
const { taskValidator, idValidator } = require('../middlewares/dataValidator');

router.get('/tasks', getTasks);
router.post('/tasks', taskValidator, addTask);
router.delete('/tasks/:id', idValidator, deleteTask);
router.put('/tasks/:id', taskValidator, editTask);

module.exports = router;
