const {} = require('express')

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

const usuariosPost = function (req, res) {

    const {nombre, edad} = req.body

    res.json({
        msg: "post API - controller",
        nombre: nombre
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