const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

var port = 8080
app.listen(port, () => console.log('Example app listening on port 3000!'))
