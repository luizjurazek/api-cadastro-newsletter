const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()

const verifyJWT = require('../middlewares/auth')

const SECRET = process.env.SECRET;

router.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no banco de dados
    if(req.body.user === 'luiz' && req.body.password == '123'){
        // auth ok
        const id = 1 //esse id vem do banco de dados
        const token = jwt.sign({id}, SECRET, { expiresIn: 3000 })
        return res.json({ auth: true, token: token })
    }

    res.status(500).json({message: 'Login inválido'})
})

router.post('/logout',(req, res) => {
    res.json({auth: false, token: null});
})

router.get('/', verifyJWT, (req, res) => {
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
})

module.exports = router