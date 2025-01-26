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
import { AdminAttaquesComponent } from './components/pages/admin-pages/admin-attaques/admin-attaques.component';
import { AttaquesFormComponent } from './components/pages/forms/attaques-form/attaques-form.component';
import { PokedexFormComponent } from './components/pages/forms/pokedex-form/pokedex-form.component';
import { AdminBoitePokedexComponent } from './components/pages/admin-pages/admin-boite-pokedex/admin-boite-pokedex.component';
import { BoitesPokedexFormComponent } from './components/pages/forms/boites-pokedex-form/boites-pokedex-form.component';
import { AdminDresseursComponent } from './components/pages/admin-pages/admin-dresseurs/admin-dresseurs.component';
import { DresseursFormComponent } from './components/pages/forms/dresseurs-form/dresseurs-form/dresseurs-form.component';
import { AdminNaturesComponent } from './components/pages/admin-pages/admin-natures/admin-natures.component';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent},
    { path: 'admin-home', component: AdminHomeComponent},
    { path: 'admin-pokedex', component: AdminPokedexComponent},
    { path: 'admin-boite-pokedex', component: AdminBoitePokedexComponent},
    { path: 'admin-attaques', component: AdminAttaquesComponent},
    { path: 'admin-dresseurs', component: AdminDresseursComponent},
    { path: 'admin-natures', component: AdminNaturesComponent},
    { path: 'admin-pokedex-form', component: PokedexFormComponent},
    { path: 'admin-boite-pokedex-form', component: BoitesPokedexFormComponent},
    { path: 'admin-attaque-form', component: AttaquesFormComponent},
    { path: 'admin-dresseurs-form', component: DresseursFormComponent},
    { path: 'pokedex-national', component: PokedexNationalComponent},
    { path: 'pokedex-shiny', component: PokedexShinyComponent},
    { path: 'stats-pokedex', component: StatsPokedexComponent},
    { path: 'boite-shiny', component: BoiteShinyComponent},
    { path: 'stats', component: StatsBoitesComponent},
    { path: 'stats-generales', component: StatsGeneralesComponent},
];