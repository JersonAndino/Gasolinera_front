import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  tipo='';
  constructor(
    private _router:Router,
    private _route:ActivatedRoute
  ){}
  buscarPorNombre(){
    this._router.navigate(['/buscar-tipo/'+this.tipo])
  }
}