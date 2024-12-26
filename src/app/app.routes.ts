import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoiteShinyComponent } from './components/pages/boite-shiny/boite-shiny.component';
import { StatsComponent } from './components/pages/stats/stats.component';
import { StatsGeneralesComponent } from './components/pages/stats-generales/stats-generales.component';
import { PokedexShinyComponent } from './components/pages/pokedex-shiny/pokedex-shiny.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path: 'boite-shiny', component: BoiteShinyComponent},
    { path: 'stats', component: StatsComponent},
    { path: 'stats-generales', component: StatsGeneralesComponent},
    { path: 'pokedex-shiny', component: PokedexShinyComponent}
];
