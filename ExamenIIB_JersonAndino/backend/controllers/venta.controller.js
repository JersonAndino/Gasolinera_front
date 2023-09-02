'use strict'
var fs=require('fs');
const path=require('path');
var Venta=require('../models/venta');
const session = require('express-session');

var controller={
    guardarVenta:function(req,res){
        var venta=new Venta();
        venta.cedula=req.body.cedula;
        venta.tipo=req.body.tipo;
        venta.cantidad=req.body.cantidad;
        venta.total=req.body.total;
        venta.save()
        .then(result=>{
            if(!result) return res.status(404).send({message:"No se han podido guardar los datos"});
            return res.status(200).send({result});
        })
        .catch(err=>{
            console.log(err);
        });
        
    },
    obtenerVentasPorCedula:function(req,res){
        var cedulaBuscar=req.params.cedula;
        Venta.find({cedula:cedulaBuscar})
        .then(result => {
            if (!result) return res.status(404).send({message:'No se encontraron datos con los valores proporcionados'});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    },
    obtenerVentas:function(req,res){
        Venta.find({}).sort().exec()
        .then(result => {
            if (!result) return res.status(404).send({message:'No se encontraron datos'});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    },
    eliminarVentaPorId:function(req,res){
        var idBuscar=req.params.id;
        Venta.findByIdAndDelete(idBuscar)
        .then(result => {
            if (!result) return res.status(404).send({message:'No se pudo eliminar el registro'});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports=controller;