import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Subject } from 'rxjs';

import { Tipo } from '../models/tipo';

@Injectable()
export class TipoService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    postTipo(tipo:Tipo):Observable<any>{
        let params=JSON.stringify(tipo);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'tipo',params,{headers:headers});
    }
    getTipoPorId(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'tipo/'+id,{headers:headers});
    }
    getTiposPorNombre(nombre:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'tipos/'+nombre,{headers:headers});
    }
    getTipos():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'tipo',{headers:headers});
    }
    deleteTipoPorId(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'tipo/'+id,{headers:headers});
    }
    putTipoPorId(tipo:Tipo):Observable<any>{
        let params=JSON.stringify(tipo);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'tipo',params,{headers:headers});
    }
}