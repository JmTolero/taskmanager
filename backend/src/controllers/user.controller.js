const User = require('../models/user.model');



exports.createUser  = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            username: req.body.name,
            password: req.body.password
        })
        const new_user = await user.save();
        res.status(200).json(
            {
                "message" : "user created",
                data: new_user
            }
        )
    } catch (error) {
        res.status(500).json({
            "message":"user create failed"
        })
        console.log(error)

    }
}




