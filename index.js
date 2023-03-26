
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())
var jwt = require('jsonwebtoken');
var cors = require('cors')
const { connection } = require('./db');
const { userRoute } = require('./routes/user.routes');
const { notesRoute } = require('./routes/notes.route');
const { authenticate } = require('./middleware/auth.middleware');

app.use(cors())
app.use("/user", userRoute)
app.use(authenticate)
app.use("/notes", notesRoute)
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})


app.listen(4500, async () => {
    try {
        await connection
        console.log("Staring the Server at 4500");
    } catch (error) {
        console.log(error.message);
    }
})