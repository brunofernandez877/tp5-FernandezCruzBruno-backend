import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { F1Component } from './components/f1.component/f1.component'
import { SocioComponent } from './components/socio.component/socio.component';
import { TransaccionComponent } from './components/transaccion.component/transaccion.component';
import { PublicacionComponent } from './components/publicacion.component/publicacion.component';
import { EmpleadoComponent } from './components/empleado.component/empleado.component';


export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'f1', component: F1Component},
    {path: 'socios', component: SocioComponent},
    {path: 'transacciones', component: TransaccionComponent},
    {path: 'empleados', component: EmpleadoComponent},
    {path: 'publicaciones', component: PublicacionComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
