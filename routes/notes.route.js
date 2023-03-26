
const jwt = require("jsonwebtoken")
const express = require('express');
const { notesModel } = require('../model/notes.model');

const notesRoute = express.Router()

notesRoute.get("/", async (req, res) => {
    const token = req.headers.authorization
    console.log(token);
    const decoded = jwt.verify(token, "ans")
    try {
        if (decoded) {
            const notes = await notesModel.find({ "userID": decoded.userID })
            res.status(200).send(notes)
        }
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


// notesRoute.get("/", async (req, res) => {

//     const note = await notesModel.find()
//     res.send(note)

// })

notesRoute.post("/create", async (req, res) => {
    let note = new notesModel(req.body)
    await note.save()
    res.send({ msg: "Notes Added" })
})

notesRoute.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id
    await notesModel.findByIdAndDelete({ _id: ID }, req.body)
    res.send({ "msg": "Notes Deleted" })
})



notesRoute.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    await notesModel.findByIdAndUpdate({ _id: ID }, req.body)
    res.send({ "msg": "Notes Updated" })
})









module.exports = {
    notesRoute
}