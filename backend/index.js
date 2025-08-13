const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const db = require('./db')

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

//fetch all tasks
app.get('/tasks',(req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json(err)
        //res.send("<h1>hi</h1>")
        res.json(results)
    })

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT}`)
})