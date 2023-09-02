'use strict'
var fs=require('fs');
const path=require('path');
var Tipo=require('../models/tipo');
const session = require('express-session');

var controller={
    guardarTipo:function(req,res){
        var tipo=new Tipo();
        tipo.nombre=req.body.nombre;
        tipo.precio_litro=req.body.precio_litro;
        tipo.imagen=null;
        tipo.save()
                .then(result=>{
                    if(!result) return res.status(404).send({message:"No se han podido guardar los datos"});
                    return res.status(200).send({result});
                })
                .catch(err=>{
                    console.log(err);
                });
        
    },
    obtenerTipoSPorNombre:function(req,res){
        var nombreBuscar=req.params.nombre;
        Tipo.find({nombre:{ $regex: '.*'+nombreBuscar+'.*'}}).sort().exec()
        .then(result => {
            if (!result) return res.status(404).send({message:'No se encontraron datos con los valores proporcionados'});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    },
    obtenerTipoPorId:function(req,res){
        var idBuscar=req.params.id;
        Tipo.findById(idBuscar)
        .then(result => {
            if (!result) return res.status(404).send({message:'No se encontraron datos con los valores proporcionados'});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    },
    obtenerTipos:function(req,res){
        Tipo.find({}).sort().exec()
        .then(result => {
            if (!result) return res.status(404).send({message:'No se encontraron datos'});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    },
    actualizarTipoPorId:function(req,res){
        var tipo=req.body;
        Tipo.findByIdAndUpdate(tipo._id,tipo,{new:true})
        .then(result => {
            if (!result) return res.status(404).send({message:'No se han podido actualizar los datos'});
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    },
    eliminarTipoPorId:function(req,res){
        var idBuscar=req.params.id;
        Tipo.findOneAndDelete({_id:idBuscar})
        .then(result => {
            if (!result) return res.status(404).send({message:'No se pudo eliminar el registro'});
            console.log(result);
            return res.status(200).send({result});
        })
        .catch(err => {
            console.log(err);
        });
    },
    uploadImage:function(req,res){
        var idTipo=req.params.id;
        var fileName='Imagen no subida';

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Tipo.findByIdAndUpdate(idTipo,{imagen:fileName},{new:true})
                .then(result => {
                    if (!result) return res.status(404).send({message:'No se pueden actualizar los datos'});
                    return res.status(200).send({result});
                })
                .catch(err => {
                    return res.status(200).send({message:'Error al actualizar los datos'});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extension no es valida'});
                });
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    getImage:function(req,res){
        var file=req.params.imagen;
        // console.log(file);
        var path_file="./uploads/"+file;
        fs.exists(path_file,(exists)=>{
            if (exists){
                return  res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:"La imagen no existe"});
            }
        })
    }
}

module.exports=controller;