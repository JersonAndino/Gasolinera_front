'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var tipoSchema=Schema({
    nombre:String,
    precio_litro:Number,
    imagen:String
});

module.exports=mongoose.model('Tipo',tipoSchema);