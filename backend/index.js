const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
const bodyParser = require("body-parser")

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

