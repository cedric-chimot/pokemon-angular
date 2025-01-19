import { Routes } from '@angular/router';
import { BoiteShinyComponent } from './components/pages/boite-shiny/boite-shiny.component';
import { StatsBoitesComponent } from './components/pages/stats-boites-shiny/stats-boites-shiny.component';
import { StatsGeneralesComponent } from './components/pages/stats-generales/stats-generales.component';
import { PokedexShinyComponent } from './components/pages/pokedex-shiny/pokedex-shiny.component';
import { PokedexNationalComponent } from './components/pages/pokedex-national/pokedex-national.component';
import { StatsPokedexComponent } from './components/pages/stats-pokedex/stats-pokedex.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { AdminHomeComponent } from './components/pages/admin-pages/admin-home/admin-home.component';
import { AdminPokedexComponent } from './components/pages/admin-pages/admin-pokedex/admin-pokedex.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent},
    { path: 'admin-home', component: AdminHomeComponent},
    { path: 'admin-pokedex', component: AdminPokedexComponent},
    { path: 'pokedex-national', component: PokedexNationalComponent},
    { path: 'pokedex-shiny', component: PokedexShinyComponent},
    { path: 'stats-pokedex', component: StatsPokedexComponent},
    { path: 'boite-shiny', component: BoiteShinyComponent},
    { path: 'stats', component: StatsBoitesComponent},
    { path: 'stats-generales', component: StatsGeneralesComponent},
];