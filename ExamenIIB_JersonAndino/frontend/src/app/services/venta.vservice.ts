import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Subject } from 'rxjs';

import { Venta } from '../models/venta';

@Injectable()
export class VentaService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    postVenta(venta:Venta):Observable<any>{
        let params=JSON.stringify(venta);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'venta',params,{headers:headers});
    }
    getVenta(cedula:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'venta/'+cedula,{headers:headers});
    }
    getVentas():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'venta',{headers:headers});
    }
    deleteVenta(cedula:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'venta/'+cedula,{headers:headers});
    }
}