import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonShiny } from '../../../models/tables/PokemonShiny';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoiteSwitcherComponent } from "../../commons/boite-switcher/boite-switcher.component";
import { ColorsService } from '../../../services/colors/colors.service';
import { AttaquesService } from '../../../services/attaques/attaques.service';
import { PokemonShinyService } from '../../../services/pokemon-shiny/pokemon-shiny.service';
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";
import { Boite } from '../../../models/stats/Boites';

@Component({
  selector: 'app-boite-shiny',
  imports: [CommonModule, RouterModule, BoiteSwitcherComponent, ButtonTopComponent],
  templateUrl: './boite-shiny.component.html',
  styleUrls: ['./boite-shiny.component.css']
})
export class BoiteShinyComponent implements OnInit  {
  pokemonList: PokemonShiny[] = [];
  pokemonGroup: PokemonShiny[] = this.pokemonList;
  currentBoite: string = 'SHINY FAVORIS';
  currentBoiteId: number = 1;
  boite: Boite[] = [];
  nbLevel100: { [key: string]: number } = {
    'SHINY FAVORIS': 21,
    'SHINY STRATS': 11,
    'SHINY STRATS 2': 6,
    'SHINY ALOLA': 21,
    'SHINY GALAR': 13,
    'SHINY PALDEA': 7,
    'SHINY LÉGENDAIRES': 16,
    'SHINY LÉGENDAIRES & Co': 10,
    'SHINY ARCEUS & Cie': 6
  };
  attaqueList: { [key: string]: string } = {};
  attaqueColors: { [key: string]: string | undefined } = {};

  @Output() boiteChange = new EventEmitter<number>();

 constructor(
    private pokemonShinyService: PokemonShinyService,
    private colorService: ColorsService,
    private attaquesService: AttaquesService) { }

  ngOnInit(): void {
    this.loadBoiteShiny(this.currentBoiteId);
  }

  // Méthode pour charger la liste des Pokémon d'une boîte spécifique
  loadBoiteShiny(boiteId: number) {
    this.pokemonShinyService.getBoitesShinyById(boiteId)
      .subscribe({
        next: (data: PokemonShiny[]) => {
          this.pokemonList = data || [];
          this.attaqueColors = {};
          this.getAttackType();
        },
        error: (error: any) => {
          console.error('Erreur lors du chargement des Pokémon de la boîte :', error);
        }
      });
  }

  // Méthode pour changer de boîte
  switchBoite(boiteId: number): void {
    this.currentBoiteId = boiteId;
    this.loadBoiteShiny(boiteId);
  }

  // Fonction pour obtenir la couleur d'un type
  getTypeColor(type: string): string {
    return this.colorService.getTypeColor(type) || '#000000';
  }

  // Méthode pour obtenir la couleur à donner à une attaque selon son type
  private getAttackType(): void {
    this.pokemonList.forEach((pokemon) => {
      const attaques = [
        pokemon.attaque1,
        pokemon.attaque2,
        pokemon.attaque3,
        pokemon.attaque4
      ].filter(Boolean); // Filtre les attaques nulles ou undefined

      attaques.forEach((attaque) => {
        if (!this.attaqueColors[attaque.nomAttaque]) {
          this.attaquesService.getColorForAttaque(attaque).subscribe({
            next: (couleur) => {
              this.attaqueColors[attaque.nomAttaque] = couleur ?? '#000000'; // Couleur par défaut si null
            },
            error: (error) => {
              console.error('Erreur lors de la récupération de la couleur pour', attaque.nomAttaque, error);
            }
          });
        }
      });
    });
  }

  // Méthode pour récupérer le nom de la région par son ID
  getBoiteNameById(idBoite: number): string {
    const boiteNames: { [id: number]: string } = {
      1: 'SHINY FAVORIS',
      2: 'SHINY STRATS',
      3: 'SHINY STRATS 2',
      4: 'SHINY ALOLA',
      5: 'SHINY GALAR',
      6: 'SHINY PALDEA',
      7: 'SHINY LÉGENDAIRES',
      8: 'SHINY LÉGENDAIRES & Co',
      9: 'SHINY ARCEUS & Cie'
    };
    return boiteNames[idBoite] || 'Unknown boite';
  }

  getSexeSymbol(sexe: string): string {
    switch (sexe) {
      case 'Mâle ♂':
        return '♂';
      case 'Femelle ♀':
        return '♀';
      case 'Assexué Ø':
        return 'Ø';
      default:
        return '';
    }
  }

  getSexeColor(sexe: string): string {
    switch (sexe) {
      case 'Mâle ♂':
        return '#87ceeb';
      case 'Femelle ♀':
        return '#dda0dd';
      case 'Assexué Ø':
        return '#6a5acd';
      default:
        return '#000000';
    }
  }

  getRowspanForDex(pokemonGroup: PokemonShiny[], pokemon: PokemonShiny): number {
    return pokemonGroup.filter(p => p.numDex === pokemon.numDex).length;
  }

}
