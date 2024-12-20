import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoiteShinyComponent } from './components/boite-shiny/boite-shiny.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path: 'boite-shiny', component: BoiteShinyComponent}
];
