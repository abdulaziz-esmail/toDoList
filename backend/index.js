const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const db = require('./db')
const {v4: uuidv4} = require('uuid')
const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

//fetch all tasks
app.get('/tasks',(req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json(err)
        //res.send("<h1>hi</h1>")
        res.json(results)
    })

})

// add new task

app.post('/tasks', (req, res) =>{
    const title = req.body
    if(!title) return res.status(400).json({error: 'Title is required'})
    const id = uuidv4()
    db.query('INSERT INTO tasks (id, title) VALUES (?, ?)',[id, title], (err, result) => {
        if(err) return res.status(500).json(err)
        res.status(201).json({id, title, completed:false})

    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT}`)
})