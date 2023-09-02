import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearTipoComponent } from './components/crear-tipo/crear-tipo.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { DetalleTipoComponent } from './components/detalle-tipo/detalle-tipo.component';
import { BuscarTipoComponent } from './components/buscar-tipo/buscar-tipo.component';
import { HomeComponent } from './components/home/home.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  {path:'crear-tipo',component:CrearTipoComponent},
  {path:'tipos',component:TiposComponent},
  {path:'tipos/:id',component:DetalleTipoComponent},
  {path:'buscar-tipo/:nombre',component:BuscarTipoComponent},
  {path:'home',component:HomeComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'ventas',component:VentasComponent},
  {path:'',component:HomeComponent},
  {path:'**',component:VentasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
