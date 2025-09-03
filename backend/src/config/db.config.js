require('dotenv');
const { config } = require('dotenv');
const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log('Db connected');
    })
    .catch((err)=>{
        console.log("connection failed")
        console.log(err)
    })
}
connect();


module.exports = config;
