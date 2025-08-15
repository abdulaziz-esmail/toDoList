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
    
    if(!req.body) return res.status(400).json({error: 'Title is required'})
    const {title} = req.body
    const id = uuidv4()
    db.query('INSERT INTO tasks (id, title) VALUES (?, ?)',[id, title], (err, result) => {
        if(err) return res.status(500).json(err)
        res.status(201).json({id, title, completed:Boolean(false)})

    })
})

// modify a specific task

app.put('/tasks/:id', (req, res) => {
    const {id} = req.params
    const {completed} = req.body
    db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (err) => {
        if(err) return res.status(500).json(err)
        res.json({message : 'Task updated'})
    })
})

// delete a specific task

app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if(err) return res.status(500).res.json(err)
        res.json({message:'Task deleted'})
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost: ${PORT}`)
})