const {} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet = async function (req, res) {
    const {limite = 5, desde = 0} = req.query
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async function (req, res) {

    const id = req.params.id
    const {_id, password, google, correo, ...rest} = req.body

    console.log(id);

    if (password) {
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }

    

    const usuario = await Usuario.findByIdAndUpdate(id, rest)

    res.json({
        msg: "put API - controller",
        usuario
    })
}

const usuariosPost = async function (req, res) {

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})

    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        msg: "post API - controller",
        usuario,
    })
}

const usuariosDelete = async function (req, res) {

    const { id } = req.params

    console.log(req.uid);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    const usuarioAutentificado = req.usuario

    res.json({
        usuarioAutentificado
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