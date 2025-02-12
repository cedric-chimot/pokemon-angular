import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonShiny } from '../../../models/tables/PokemonShiny';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoiteSwitcherComponent } from "../../commons/boite-switcher/boite-switcher.component";
import { ColorsService } from '../../../services/colors/colors.service';
import { AttaquesService } from '../../../services/attaques/attaques.service';
import { PokemonShinyService } from '../../../services/pokemon-shiny/pokemon-shiny.service';
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";
import { Boites } from '../../../models/stats/Boites';
import { BoitesShinyService } from '../../../services/boites-shiny/boites-shiny.service';

@Component({
  selector: 'app-boite-shiny',
  imports: [CommonModule, RouterModule, BoiteSwitcherComponent, ButtonTopComponent],
  templateUrl: './boite-shiny.component.html',
  styleUrls: ['./boite-shiny.component.css']
})
export class BoiteShinyComponent implements OnInit  {
  pokemonList: PokemonShiny[] = [];
  pokemonGroup: PokemonShiny[] = this.pokemonList;
  currentBoite: string = '';
  currentBoiteId: number = 1;
  boite: Boites[] = [];
  attaqueList: { [key: string]: string } = {};
  attaqueColors: { [key: string]: string | undefined } = {};

  @Output() boiteChange = new EventEmitter<number>();

  constructor(
    private pokemonShinyService: PokemonShinyService,
    private colorService: ColorsService,
    private attaquesService: AttaquesService,
    private boiteShinyService: BoitesShinyService) { }

  ngOnInit(): void {
    this.loadBoiteShiny(this.currentBoiteId);
    this.boiteShinyService.getAllBoites().subscribe(data => {
      this.boite = data; // Assurez-vous que data est bien un tableau d'objets avec nbLevel100
      console.log(this.boite); // Vérifie dans la console si les données sont bien chargées
    });
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
  getBoiteName(): string {
    const selectedBoite = this.boite.find(boite => boite.id === this.currentBoiteId);
    return selectedBoite ? selectedBoite.nom : 'Unknown boite';
  }

  // Récuoérer le nombre de niveau 100 par boite
  getNbLevel100(): number {
    const selectedBoite = this.boite.find(b => b.id === this.currentBoiteId);
    return selectedBoite ? selectedBoite.nbLevel100 : 0; // Retourne 0 si la boîte n'est pas trouvée
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
