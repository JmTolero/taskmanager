require('dotenv');
const { config } = require('dotenv');
const mongoose = require('mongoose');


mongoose.connect(process.env.DB)
    .then(()=> {
        console.log('Db connected');
    })
    .catch((err)=>{
        console.log("connection failed")
        console.log(err)
    })

module.exports = config;
