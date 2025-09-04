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

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Please input username and password"
            });
        }

        // Find user by username (email)
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Check password (in a real app, you'd hash passwords)
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Return user data (excluding password)
        const userData = {
            _id: user._id,
            name: user.name,
            username: user.username,
            createdAt: user.createdAt
        };

        res.status(200).json({
            message: "Login successful",
            user: userData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Login failed"
        });
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
   
        const {user_id} = req.params;

        const updated_user = await User.findByIdAndUpdate(user_id, req.body);

        if(!user_id){
            return res.status(400).json({message: "Id not found"})
        }

        
        return res.status(200).json({
            message: "updated successfully",
            data: updated_user
        })

})

exports.deleteUserById = async (req, res) => {

    const user_id = req.params.user_id;


    const deleteUser = await User.findByIdAndDelete(user_id);

    res.status(200).json({
        message: "Deleted",
        data: deleteUser
    })


}





