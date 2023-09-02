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
  selector: 'app-buscar-tipo',
  templateUrl: './buscar-tipo.component.html',
  styleUrls: ['./buscar-tipo.component.css'],
  providers: [VentaService,TipoService, CargarService]
})
export class BuscarTipoComponent implements OnInit{
  public titulo:string;
  public tipo:Tipo;
  public tipos:Tipo[];
  public url=Global.url;

  public archivosParaCargar:Array<File>;
  @ViewChild('archivoImagen') fileInput:any;

  constructor(
    private _ventaService:VentaService,
    private _tipoService:TipoService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this.titulo="DETALLES DE UN TIPO DE GASOLINA";
    this.tipo=new Tipo('','',0,'');
    this.tipos=[];
    this.archivosParaCargar=[];
  }
  ngOnInit(): void {
      this._route.params.subscribe(params=>{
      let nombre=params['nombre'];
      this.obtenerTiposPorNombre(nombre);
    });
  }
  guardarTipo(form:NgForm){
    this._tipoService.postTipo(this.tipo).subscribe(
      response=>{
        if(response.result){
          // console.log(response);
          if(this.archivosParaCargar.length>0){
            this._cargarService.peticionRequest(this.url+'subir-imagen/'+response.result._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              // console.log(result);
              //this.libroGuardar=result.response;
              //this.status='success';
              //console.log(result.response.result._id);
              //this.idGuardado=result.result._id;
              form.reset();
              this.fileInput.nativeElement.value='';
            });
          }else{
            console.log("No hay archivos para cargar");
          }
        }else{
          //
        }
      },error=>{
        console.log(<any>error);
      }
    );
  }
  
  obtenerTipos(){
    this._tipoService.getTipos().subscribe(
      response=>{
        this.tipos=response.result;
        // console.log(this.tipos);
      },error=>{
        console.log(<any>error);
      }
    );
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

  obtenerTiposPorNombre(nombre:string){
    this._tipoService.getTiposPorNombre(nombre).subscribe(
      response=>{
        this.tipos=response.result;
        //console.log(this.tipos);
      },error=>{
        console.log(<any>error);
      }
    );
  }
  
  eliminarTipoPorId(){
    this._tipoService.deleteTipoPorId(this.tipo._id).subscribe(
      response=>{
        //this.tipos=response.result;
        this._router.navigate(['/tipos']);
        console.log(response);
      },error=>{
        console.log(<any>error);
      }
    );
  }

  actualizarTipoPorId(form:NgForm){
    this._tipoService.putTipoPorId(this.tipo).subscribe(
      response=>{
        if(response.result){
          // console.log(response);
          if(this.archivosParaCargar.length>0){
            this._cargarService.peticionRequest(this.url+'subir-imagen/'+response.result._id,[],this.archivosParaCargar,'imagen')
            .then((result:any)=>{
              // console.log(result);
              //this.libroGuardar=result.response;
              //this.status='success';
              //console.log(result.response.result._id);
              //this.idGuardado=result.result._id;
              form.reset();
              this.obtenerTipoPorId(this.tipo._id);
              this.obtenerTipos();
              this.fileInput.nativeElement.value='';
            });
          }else{
            console.log("No hay archivos para cargar");
          }
        }else{
          //
        }
        console.log(response);
      },error=>{
        console.log(<any>error);
      }
    );
  }

  imagenChangeEvent(archivoSeleccionado:any){
    this.archivosParaCargar=<Array<File>>archivoSeleccionado.target.files;
  }
}
