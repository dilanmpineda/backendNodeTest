/*
    Rutas de evento
    /api/events
*/

const { Router } = require("express");
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, actualizarEvento, crearEvento, eliminarEvento } = require('../controllers/events');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();

//Todas las peticiones pasan por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título debe ser obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;