'use strict'
var express=require('express');
var router=express.Router();
var ventaController=require('../controllers/venta.controller');

// guardar venta
router.post('/venta',ventaController.guardarVenta);
// obtener ventas por cedula
router.get('/venta/:cedula',ventaController.obtenerVentasPorCedula)
// obtener ventas
router.get('/venta',ventaController.obtenerVentas);
// eliminar venta por ID
router.delete('/venta/:id',ventaController.eliminarVentaPorId);

module.exports=router;