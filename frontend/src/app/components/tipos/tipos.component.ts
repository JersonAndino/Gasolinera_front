import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VentaService } from 'src/app/services/venta.vservice';
import { TipoService } from 'src/app/services/tipo.service';
import { Venta } from 'src/app/models/venta';
import { Tipo } from 'src/app/models/tipo';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css'],
  providers: [VentaService,TipoService]
})
export class TiposComponent implements OnInit{
  public titulo:string;
  public tipo:Tipo;
  public tipos:Tipo[];
  public url = Global.url;

  constructor(
    private _ventaService:VentaService,
    private _tipoService:TipoService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="CREAR UN TIPO DE GASOLINA";
    this.tipo=new Tipo('','',0,'');
    this.tipos=[];
    // this.messages=null;
    // this.nombreC=null;
    // this.cedulaC=null;
    // this.rolC=null;

    // this._usuarioService.loggedIn.subscribe(resp =>{
    //   if(resp==true){
    //     this.connected=true;
    //   }else{
    //     this.connected=false;
    //   }
    // });
    // this._usuarioService.cedula.subscribe(resp =>{
    //   if(resp!=''){
    //     this.cedulaC=resp;
    //   }
    // });
    // this._usuarioService.nombre.subscribe(resp =>{
    //   if(resp!=''){
    //     this.nombreC=resp;
    //   }
    // });
    // this._usuarioService.rol.subscribe(resp =>{
    //   if(resp!=''){
    //     this.rolC=resp;
    //   }
    // });
  }
  ngOnInit(): void {
    this.obtenerTipos();
  }
  guardarTipo(){
    this._tipoService.postTipo(this.tipo).subscribe(
      response=>{
        console.log(response);
      },error=>{
        console.log(<any>error);
      }
    );
  }
  obtenerTipos(){
    this._tipoService.getTipos().subscribe(
      response=>{
        this.tipos=response.result;
      },error=>{
        console.log(<any>error);
      }
    );
  }
}
