'use strict'
var express=require('express');
var router=express.Router();
var tipoController=require('../controllers/tipo.controller');

var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty({uploadDir:'./uploads'});

// guardar tipo
router.post('/tipo',tipoController.guardarTipo);
// obtener tipo por nombre
router.get('/tipo/:id',tipoController.obtenerTipoPorId)
router.get('/tipos/:nombre',tipoController.obtenerTipoSPorNombre)
// obtener tipos
router.get('/tipo',tipoController.obtenerTipos);
// actualizar tipo por nombre
router.put('/tipo',tipoController.actualizarTipoPorId);
// eliminar tipo por nombre
router.delete('/tipo/:id',tipoController.eliminarTipoPorId);

//agregar una imagen
router.post('/subir-imagen/:id',multipartyMiddleWare,tipoController.uploadImage);
//recuperar una imagen
router.get('/get-imagen/:imagen',tipoController.getImage);

module.exports=router;