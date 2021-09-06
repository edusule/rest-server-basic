const esAdminRole = (req, res = response, next) => {

    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verficar el rol sin el token'
        })
    }
    const {rol, nombre} = req.usuario

    if (rol!=='ADMIN_ROLE') {
        return res.status(401).json({
            msg: "No es admin"
        })
    }

}

module.exports = {
    esAdminRole
}