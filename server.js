const express = require("express")
const app = express()
const port = process.env.PORT || 3304
const bodyParser = require('body-parser')
const db = require('./database')
const response = require('./response')

app.use(bodyParser.json())

app.get('/register', (req, res) => {
    response(200, "API Profiler ready to use", "SUCCESS", res)
})
    
app.get('/register', (req, res) => {
    const sql = 'SELECT name, email, birthdate, sex, height, weight FROM profiler';

    db.query(sql, (err, fields) => {
        const data = {}
        response(200, fields, "SUCCESS", res)
    })
})
  
app.get('/register/:email', (req, res) => {
    const email = req.params.email
    response(200, { email }, `Spesific data by email '${email}'`, res)
})

app.post('/register', (req, res) => {
    const { name, email, password, birthdate, sex, height, weight } = req.body

    const sql = `INSERT INTO profiler (name, email, password, birthdate, sex, height, weight) VALUES ('${name}', '${email}', '${password}', '${birthdate}', '${sex}', ${height}, ${weight})`
    
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "Data Added Successfuly", res)
        }
    })
})

app.put('/register', (req, res) => {
    const { name, email, password, birthdate, sex, height, weight } = req.body
    const sql = `UPDATE profiler SET name = '${name}', password = '${password}', birthdate = '${birthdate}', sex = '${sex}', height = ${height}, weight = ${weight} WHERE email = '${email}'`
    
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message,
            }
            response(200, data, "Update Data Successfuly", res)
        } else {
            response(404, "user not found", "error", res)
        }
    })
})

app.delete('/register', (req, res) => {
    const { email } = req.body
    const sql = `DELETE FROM profiler WHERE email = '${email}'`
    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)

        if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows,
            }
            response(200, data, "Delete Data Successfuly", res)
        } else {
            response(404, "user not found", "error", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})