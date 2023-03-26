
const express = require('express');
const mongoose = require('mongoose');
const { userModel } = require('../model/user.model');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoute = express.Router()


userRoute.get("/data", async (req, res) => {
    let data = await userModel.find()
    res.send(data)
})

// userRoute.post("/register", function (req, res) {
//     let { name, email, password } = req.body
//     // console.log(req.body);
//     try {
//         bcrypt.hash(password, 4, async function (err, hash) {
//             // Store hash in your password DB.
//             if (err) res.send({ "msg": "Something went Wrong", "err": err.message })
//             else {
//                 let user = new userModel({ name, email, password: hash })
//                 await user.save()
//                 // console.log(user);
//                 res.send({ "msg": "User Register Successful" })
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.send({ "msg": "Error in register", "err": error.message })
//     }
// })

userRoute.post("/register", async function (req, res) {
    try {
        const payload = req.body
        const user = await userModel.findOne({ email: payload.email })
        if (user) {
            res.send({ msg: "Please login, User already Exist" })
        } else {
            const hashPassword = await bcrypt.hashSync(payload.password, 5)
            payload.password = hashPassword

            const newUser = new userModel(payload)
            await newUser.save()
            res.send({ msg: "User Successfully Register" })
        }

    } catch (error) {
        res.send({ msg: error.message })
    }
})

userRoute.post("/login", async (req, res) => {
    // console.log("sd");
    const { email, password } = req.body

    try {
        let user = await userModel.find({ email })
        console.log(user);
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                // result == true
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, 'ans');
                    res.send({ "msg": "User Login Successful", "token": token })
                }
                else {
                    res.send({ "msg": "Wrong Credentials", "err": err.message })
                }
            })
        } else {
            res.send({ "msg": "Please check your Credentials" })
        }
    } catch (error) {
        res.send({ "msg": "Something went Wrong", "err": error.message })
    }
})








module.exports = {
    userRoute
}