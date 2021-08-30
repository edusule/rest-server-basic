const { Router } = require('express')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')


const router = Router()

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut)

router.post('/',[
    check('correo', "El nombre es obligatorio").not().isEmpty(),
    check('password', "Pass no valido").isLength({min: 6}),
    check('correo', "El correo no es valido").isEmail(),
    check('correo').custom( emailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost)

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)

router.patch('/',usuariosPatch)




module.exports = router