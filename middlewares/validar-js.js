const { response } = require("express")
const jwt = require("jsonwebtoken")
const Usuario = require('../models/usuario')

const validarJWT = async (req,res = response,next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: "No token"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: "Usuario no existe en BD"
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Usuario en false"
            })
        }

        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(401).json({
            msg: "Token no valido"
        })
    }

    console.log(token);

    

}

module.exports = {
    validarJWT
}