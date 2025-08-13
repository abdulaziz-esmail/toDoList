const mysql = require("mysql2")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist_db'
})

db.connect((err) => {
    if(err) {
        console.log('error connecting to MySQL:', err)
        return
    }
    console.log("connected to MySQL database.")
})

module.exports = db