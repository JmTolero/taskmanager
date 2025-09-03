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
            enum: ['pending', 'in-progress', 'completed'], // allowed values
            default: 'pending' 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, // reference type
            ref: 'User', // name of the model you are referencing
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Tasks = mongoose.model('Tasks', TaskSchema)

module.exports = Tasks;