const express = require('express')


const app = express()


app.get('/', (req, res) => {
    console.log("Radi")
})

app.listen(5000, (req, res) => {
    console.log("Listen on port 9000")
})

//test

