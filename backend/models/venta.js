'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ventaSchema=Schema({
    cedula:String,
    tipo:String,
    cantidad:Number,
    total:Number
});

module.exports=mongoose.model('Venta',ventaSchema);