const express = require('express')
const cors = require('cors')
const app = express();
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//-----------------------------------------------------------
//routes ni bai
app.get('/', (req,res) =>{
    res.send('Hello this is from server');
})

app.use(userRoutes)
app.use(taskRoutes)



//----------------------------------------------------------



module.exports = app;