const { Router } = require('express')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { esRolValido } = require('../helpers/db-validators')


const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/',[
    check('correo', "El nombre es obligatorio").not().isEmpty(),
    check('password', "Pass no valido").isLength({min: 6}),
    check('correo', "El correo no es valido").isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/',usuariosPatch)




module.exports = router