const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function verifyJWT(req, res, next) {
    const token = req.headers['authorization']
    if (!token) res.status(401).json({
        auth: false,
        message: 'No token provided'
    })

    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) return res.status(500).json({
            auth: false,
            message: 'Faileto to authenticate token.'
        })

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    })
}

module.exports = verifyJWT