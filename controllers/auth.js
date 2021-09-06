const {response} = require('express');
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) =>{

    const { correo, password } = req.body

    try {

        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg: "User/pass not valid"
            })
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "User/pass not valid  --- estado:false"
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: "User/pass not valid  --- password no valida"
            })
        }

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

        res.json({
            msg: 'Login ok'
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con admin'
        })
        
    }
    
}

module.exports = {
    login
}