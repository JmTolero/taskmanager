const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

router.post('/api/tasks', TaskController.createTask)
router.get('/api/tasks', TaskController.getAllTask)
router.get('/api/tasks/:task_id', TaskController.getTaskById)
router.patch('/api/tasks/:task_id', TaskController.updateTaskById)
router.delete('/api/tasks/:task_id', TaskController.deleteTaskById)

module.exports = router;