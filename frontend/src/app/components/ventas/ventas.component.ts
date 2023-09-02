import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VentaService } from 'src/app/services/venta.vservice';
import { TipoService } from 'src/app/services/tipo.service';
import { CargarService } from 'src/app/services/cargar.service';
import { Venta } from 'src/app/models/venta';
import { Tipo } from 'src/app/models/tipo';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentaService,TipoService, CargarService]
})
export class VentasComponent implements OnInit{
  public titulo:string;
  public tipo:Tipo;
  public tipos:Tipo[];
  public url=Global.url;
  public venta:Venta;
  public ventas:Venta[];

  constructor(
    private _ventaService:VentaService,
    private _tipoService:TipoService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="REALIZA UNA VENTA";
    this.tipo=new Tipo('','',0,'');
    this.tipos=[];
    this.venta=new Venta('','','',0,0);
    this.ventas=[];
  }
  ngOnInit(): void {
    this.obtenerTipos();
    this.obtenerVentas();
  }
  obtenerTipos(){
    this._tipoService.getTipos().subscribe(
      response=>{
        this.tipos=response.result;
        this.tipo=this.tipos[0];
        // console.log(this.tipos);
      },error=>{
        console.log(<any>error);
      }
    );
  }
  calcularTotal(evento:any){
    this.obtenerTipoPorId(this.tipo._id);
    var precio_litro=this.tipo.precio_litro;
    this.venta.total=this.venta.cantidad*precio_litro;
  }
  obtenerTipoPorId(id:string){
    this._tipoService.getTipoPorId(id).subscribe(
      response=>{
        this.tipo=response.result;
        // console.log(this.tipo);
      },error=>{
        console.log(<any>error);
      }
    );
  }
  postVenta(form:NgForm){
    this.venta.tipo=this.tipo.nombre;
    this._ventaService.postVenta(this.venta).subscribe(
      response=>{
        if (response.result){
          form.reset();
          this.obtenerTipos();
          this.obtenerVentas();
        }
      },error=>{
        console.log(<any>error);
      }
    );
  }
  obtenerVentas(){
    this._ventaService.getVentas().subscribe(
      response=>{
        if (response.result){
          this.ventas=response.result;
          //console.log(this.ventas);
        }else{
        }
      },error=>{console.log(<any>error);}
    );
  }
}
