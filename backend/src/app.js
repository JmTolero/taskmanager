const express = require('express')
const cors = require('cors')
const app = express();
const userRoutes = require('./routes/user.routes')
// const dbconfig = require('../src/config/db.config')

app.use(express.json())
app.use(cors())

//-----------------------------------------------------------
//routes ni bai
app.get('/', (req,res) =>{
    res.send('Hello this is from server');
})

app.use(userRoutes)



//----------------------------------------------------------



module.exports = app;