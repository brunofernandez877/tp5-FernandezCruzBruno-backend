import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { F1Component } from './components/f1.component/f1.component'
import { SocioComponent } from './components/socio.component/socio.component';
import { TransaccionComponent } from './components/transaccion.component/transaccion.component';


export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'f1', component: F1Component},
    {path: 'socios', component: SocioComponent},
    {path: 'transacciones', component: TransaccionComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
