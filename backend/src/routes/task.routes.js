const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

router.post('/api/task', TaskController.createTask)
router.get('/api/tasks', TaskController.getAllTask)
router.get('/api/task/:task_id', TaskController.getTaskById)
router.patch('/api/task/:task_id', TaskController.updateTaskById)
router.delete('/api/task/:task_id', TaskController.deleteTaskById)

module.exports = router;