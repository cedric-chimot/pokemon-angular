import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from "../../../commons/admin/admin-sidebar/admin-sidebar.component";
import { BoitesShinyService } from '../../../../services/boites-shiny/boites-shiny.service';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';
import { PokemonShinyService } from '../../../../services/pokemon-shiny/pokemon-shiny.service';
import { AttaquesService } from '../../../../services/attaques/attaques.service';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, RouterModule, AdminSidebarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  nbPokemons: number = 0;
  nbShiny: number = 0;
  nbDresseurs: number = 0;
  nbBoitesShiny: number = 0;
  nbAttaques: number = 0;
  
  constructor(
    private pokedexService: PokedexNationalService,
    private shinyService: PokemonShinyService, 
    private dresseurService: DresseursService,
    private boitesService: BoitesShinyService,
    private attaquesService: AttaquesService) { }

  ngOnInit(): void {
    this.getAllDatas();
  }

  getAllDatas(): void {
    this.pokedexService.getNbPokemonsInPokedex()
      .subscribe({
        next: (nbPokemons: number) => {
          this.nbPokemons = nbPokemons;
        },
        error: (err: any) => {
          console.error('Error fetching pokemons', err);
        }
      });

    this.shinyService.getNbShinies()
      .subscribe({
        next: (nbShiny: number) => {
          this.nbShiny = nbShiny;
        },
        error: (err: any) => {
          console.error('Error fetching shiny pokemons', err);
        }
      });

    this.dresseurService.getNbDresseurs()
      .subscribe({
          next: (nbDresseurs: number) => {
            this.nbDresseurs = nbDresseurs;
          },
          error: (err: any) => {
            console.error('Error fetching dresseurs', err);
          }
      });

      this.boitesService.getNbBoites()
        .subscribe({
            next: (nbBoitesShiny: number) => {
              this.nbBoitesShiny = nbBoitesShiny;
            },
            error: (err: any) => {
              console.error('Error fetching boites', err);
            }
        });

        this.attaquesService.getNbAttaques()
          .subscribe({
              next: (nbAttaques: number) => {
                this.nbAttaques = nbAttaques;
              },
              error: (err: any) => {
                console.error('Error fetching boites', err);
              }
          });
  }

}
  
