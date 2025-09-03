const User = require('../models/user.model');
const asyncHandler = require('express-async-handler')


exports.createUser  = async (req, res) => {
    try {

        const {name , username, password} = req.body;

        if(!name || !username || !password){
            return res.json({
                message : "Please input name, username and password"
            })
        }
        const user = new User({
            name,
            username,
            password
        })
        const new_user = await user.save();
        res.status(200).json(
            {
                message : "user created",
                data: new_user
            }
        )   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"user create failed"
        })
        

    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Get all user Error"})
    }
}

exports.getUserById = async (req,res) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findById(user_id);
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error get user id"})
    }
}

exports.updateUserById = asyncHandler(async (req,res) =>{
   
        const { name } = req.body;

        const user_id = req.params.user_id;


        if(!name){
            return res.status(400).json({message: ""})
        }

        if(!user_id){
            return res.status(400).json({message: "Not found ID"})
        }

        const updated_user = await User.findByIdAndUpdate(
            {_id:user_id},
            {name}
        );
        res.status(200).json({
            message: "updated successfully",
            data: updated_user
        })



})

exports.deleteUserById = async (req, res) => {

    const user_id = req.params.user_id;

    const deleteUser = await User.findByIdAndDelete(
        {_id: user_id}
    );

    res.status(200).json({
        message: "Deleted",
        data: deleteUser
    })


}





