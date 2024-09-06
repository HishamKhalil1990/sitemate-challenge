'use strict'
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const issueRouter = require('./routes/issueRouter')

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/issues',issueRouter)

module.exports = app