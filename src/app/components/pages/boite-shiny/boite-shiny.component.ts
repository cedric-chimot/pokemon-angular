import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonShiny } from '../../../models/tables/PokemonShiny';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoiteSwitcherComponent } from "../../commons/boite-switcher/boite-switcher.component";
import { ColorsService } from '../../../services/colors/colors.service';
import { AttaquesService } from '../../../services/attaques/attaques.service';
import { PokemonShinyService } from '../../../services/pokemon-shiny/pokemon-shiny.service';
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";

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
  boites = [
    { id: 1, nom: 'SHINY FAVORIS' },
    { id: 2, nom: 'SHINY STRATS' },
    { id: 3, nom: 'SHINY STRATS 2' },
    { id: 4, nom: 'SHINY ALOLA' },
    { id: 5, nom: 'SHINY GALAR' },
    { id: 6, nom: 'SHINY PALDEA' },
    { id: 7, nom: 'SHINY LEGENDAIRES' },
    { id: 8, nom: 'SHINY LEGENDAIRES ET AUTRES' },
    { id: 9, nom: 'SHINY ARCEUS ET Cie' }
  ];
  nbLevel100: { [key: string]: number } = {
    'SHINY FAVORIS': 21,
    'SHINY STRATS': 11,
    'SHINY STRATS 2': 6,
    'SHINY ALOLA': 21,
    'SHINY GALAR': 13,
    'SHINY PALDEA': 7,
    'SHINY LÉGENDAIRES': 16,
    'SHINY LÉGENDAIRES ET AUTRES': 10,
    'SHINY ARCEUS ET Cie': 2 
  };
  attaqueList: { [key: string]: string } = {};
  attaqueColors: { [key: string]: string | undefined } = {};

  @Output() boiteChange = new EventEmitter<number>();
  
 constructor(
    private pokemonShinyService: PokemonShinyService,
    private colorService: ColorsService,
    private attaquesService: AttaquesService) { }

  ngOnInit(): void {
    this.loadBoiteShiny(this.currentBoite);
    this.pokemonShinyService.getBoitesShiny(this.currentBoite)
      .subscribe({
        next: (data) => {
          this.pokemonList = data || [];
          this.getAttackType();
        },
        error: (error: any) => console.error(error),
      });
  }

  // Méthode pour charger la liste des Pokémon d'une boîte spécifique
  loadBoiteShiny(boite: string) {
    if (!boite || typeof boite !== 'string') {
      console.error('Le nom de la boîte est invalide');
      return;
    }

  this.pokemonShinyService.getBoitesShiny(boite)
    .subscribe({
      next: (data: PokemonShiny[]) => {
        if (data && Array.isArray(data)) {
          this.pokemonList = data;
          this.attaqueColors = {};  // Réinitialise les couleurs des attaques
          this.getAttackType();  // Rappelle la méthode pour récupérer et afficher les attaques
        } else {
          console.warn('Aucun Pokémon trouvé pour cette boîte');
          this.pokemonList = [];  // Ou une valeur par défaut si besoin
        }
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des Pokémon de la boîte :', error);
      }
    });
  }

  // Méthode pour changer de boîte
  switchBoite(boite: string): void {
    if (boite && typeof boite === 'string') {
      this.currentBoite = boite;
      this.loadBoiteShiny(boite);  // Charge la boîte sélectionnée
    } else {
      console.error('La valeur de "boite" n\'est pas valide');
    }
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
