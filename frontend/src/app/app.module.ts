import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearTipoComponent } from './components/crear-tipo/crear-tipo.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { DetalleTipoComponent } from './components/detalle-tipo/detalle-tipo.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BuscarTipoComponent } from './components/buscar-tipo/buscar-tipo.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearTipoComponent,
    TiposComponent,
    DetalleTipoComponent,
    VentasComponent,
    FooterComponent,
    NavbarComponent,
    BuscarTipoComponent,
    ContactoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
