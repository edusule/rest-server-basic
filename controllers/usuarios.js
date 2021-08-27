const {} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet = function (req, res) {
    const {q, nombre, apikey, limit = 10} = req.query
    res.json({
        msg: "get API - controller",
        q,
        nombre,
        apikey,
        limit
    })
}

const usuariosPut = function (req, res) {

    const id = req.params.id
    res.json({
        msg: "put API - controller",
        id : id
    })
}

const usuariosPost = async function (req, res) {

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})


    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        return res.status(400).json({
            msg: "Ese correo ya esta registrado"
        })
    }

    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        msg: "post API - controller",
        usuario,
    })
}

const usuariosDelete = function (req, res) {
    res.json({
        msg: "delete API - controller"
    })
}

const usuariosPatch = function (req, res) {
    res.json({
        msg: "patch API - controller"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosPut
}