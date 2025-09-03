const Task = require('../models/task.model')


exports.createTask = async (req, res) => {
    try {
        const { Taskname, description, user_id} = req.body

        if(!Taskname || !description || !user_id){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const task = new Task({
            Taskname,
            description,
            user: user_id
        })


        const new_task = await task.save();
        res.status(201).json({
            message: "Task added succesfully",
            new_task
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error,
            err: "Add task error"
        })
    }
}

exports.getAllTask = async (req, res) => {

    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed fetching"
        })
    }

}

exports.getTaskById = async (req,res) => {
        try {
            const {task_id} = req.params;
            const task = await Task.findById(task_id);
            return res.status(200).json({
                task_id,
                data: task
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Error fetch one task",
                error
            })
        }
}

exports.updateTaskById = async (req, res) => {
    try {
        const { task_id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(task_id, req.body);

        if(!task_id){
            return res.status(404).json({
                errmessage: "Task Id not found"
            })
        }

        return res.status(201).json({
            message: "Updated Successfully",
            data: updatedTask
        })
    } catch (error) {
        console.log(err)
        return res.status(500).json({
            errmessage: "Failed update",
            error
        })
    }
}

exports.deleteTaskById = async (req,res) => {
    try {
        const {task_id} = req.params;
        const deleteTask = await Task.findByIdAndDelete(task_id)
        
        return res.status(200).json({
            message: "Deleted Success",
            data_deleted: deleteTask
        })
    } catch (error) {
        return res.status(500).json({
            errmessage: error,
            message: "Failed to Delete"
        })
    }
}


