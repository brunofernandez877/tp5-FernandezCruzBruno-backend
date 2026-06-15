import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { F1Component } from './components/f1.component/f1.component'


export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'f1', component: F1Component},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
