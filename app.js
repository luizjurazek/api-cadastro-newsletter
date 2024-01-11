const express = require('express')
const connection = require('./config/connection')

const app = express()
const port = 3000

app.use(express.json())

const routerUser = require('./routes/routeUsers')
const routerAdmin = require('./routes/routeAdmin')


app.use('/user', routerUser)
app.use('/', routerAdmin)

app.listen(port, ()=>{
    console.log("Servidor rodando na porta: " + port)
})