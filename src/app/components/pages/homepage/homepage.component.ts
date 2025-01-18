import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DresseursService } from '../../../services/dresseurs/dresseurs.service';
import { PokedexNationalService } from '../../../services/pokedex-national/pokedex-national.service';
import { PokemonShinyService } from '../../../services/pokemon-shiny/pokemon-shiny.service';
import { BoitesShinyService } from '../../../services/stats-shiny/boites-shiny.service';
import { FooterComponent } from "../../commons/footer/footer.component";

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  nbPokemons: number = 0;
  nbShiny: number = 0;
  nbDresseurs: number = 0;
  nbBoitesShiny: number = 0;
  
  constructor(
    private pokedexService: PokedexNationalService,
    private shinyService: PokemonShinyService, 
    private dresseurService: DresseursService,
    private boitesService: BoitesShinyService) { }

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
  }

}
