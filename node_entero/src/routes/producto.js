const express = require('express');
const router = express.Router();        //uso de rutas
const productoController = require('../controllers/productoController');

router.get('/', productoController.listar);
router.post('/add', productoController.guardar )
router.get('/delete/:id',productoController.eliminar);
router.get('/update/:id', productoController.editar);
router.post('/update/:id', productoController.actualizar);

module.exports = router;