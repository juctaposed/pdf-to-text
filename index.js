const express = require('express')
const fileUpload = require('express-fileupload')
const pdfParse = require('pdf-parse')

const app = express()

app.use('/', express.static('public'))
app.use(fileUpload())


app.post('/extract-text', (req, res) => {
    if(!req.files && !req.files.pdfFile) {
        res.statusCode(400)
        res.end()
    }

    pdfParse(req.files.pdfFile).then(results => {
        res.send(results.text)
    }).catch(err => {
        console.log(err)
        res.statusCode(500)
        res.end()
    })
})

app.listen(3000)
