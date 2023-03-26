

const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({

    title: { type: String, required: true },
    body: { type: String, required: true },
    userID: { type: String, required: true },
})

const notesModel = mongoose.model("note", notesSchema)

module.exports = {
    notesModel
}