/*
    Rutas de usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 3 caracteres o mas').isLength({ min: 3 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 3 caracteres o mas').isLength({ min: 3 }),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT , revalidarToken);

module.exports = router;
