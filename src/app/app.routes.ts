import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoiteShinyComponent } from './components/pages/boite-shiny/boite-shiny.component';
import { StatsBoitesComponent } from './components/pages/stats-boites-shiny/stats-boites-shiny.component';
import { StatsGeneralesComponent } from './components/pages/stats-generales/stats-generales.component';
import { PokedexShinyComponent } from './components/pages/pokedex/pokedex-shiny/pokedex-shiny.component';
import { PokedexNationalComponent } from './components/pages/pokedex-national/pokedex-national.component';
import { StatsPokedexComponent } from './components/pages/stats-pokedex/stats-pokedex/stats-pokedex.component';
import { PokedexKantoComponent } from './components/pages/pokedex/pokedex-kanto/pokedex-kanto.component';
import { PokedexJohtoComponent } from './components/pages/pokedex/pokedex-johto/pokedex-johto.component';
import { PokedexAlolaComponent } from './components/pages/pokedex/pokedex-alola/pokedex-alola.component';
import { PokedexHisuiComponent } from './components/pages/pokedex/pokedex-hisui/pokedex-hisui.component';
import { PokedexKalosComponent } from './components/pages/pokedex/pokedex-kalos/pokedex-kalos.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path: 'pokedex-national', component: PokedexNationalComponent},
    { path: 'pokedex-shiny', component: PokedexShinyComponent},
    { path: 'pokedex-kanto', component: PokedexKantoComponent},
    { path: 'pokedex-johto', component: PokedexJohtoComponent},
    { path: 'pokedex-kalos', component: PokedexKalosComponent},
    { path: 'pokedex-alola', component: PokedexAlolaComponent},
    { path: 'pokedex-hisui', component: PokedexHisuiComponent},
    { path: 'stats-pokedex', component: StatsPokedexComponent},
    { path: 'boite-shiny', component: BoiteShinyComponent},
    { path: 'stats', component: StatsBoitesComponent},
    { path: 'stats-generales', component: StatsGeneralesComponent},
];

