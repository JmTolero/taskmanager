const mongoose = require('mongoose')


const TaskSchema = mongoose.Schema(
    {
        Taskname: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'], 
            default: 'pending' 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Tasks = mongoose.model('Tasks', TaskSchema)

module.exports = Tasks;