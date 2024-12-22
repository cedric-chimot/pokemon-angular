import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoiteShinyComponent } from './components/pages/boite-shiny/boite-shiny.component';
import { StatsComponent } from './components/pages/stats/stats.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path: 'boite-shiny', component: BoiteShinyComponent},
    { path: 'stats', component: StatsComponent}
];
