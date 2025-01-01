import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoiteShiny } from '../../../models/tables/BoiteShiny';
import { BoiteShinyService } from '../../../services/boites-shiny/boite-shiny.service';

@Component({
  selector: 'app-pokedex-shiny',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokedex-shiny.component.html',
  styleUrls: ['./pokedex-shiny.component.css']
})
export class PokedexShinyComponent {
  shinyList: BoiteShiny[] = [];
  columnTextColors: string[] = [
    '#191973',
    '#e3c035', 
    '#87ceeb', 
    '#e94152', 
    '#dda0dd'
  ];
  pageSize = 24;
  currentPage = 1;

  // Initialisation du composant avec la liste des Pokémon shiny
  constructor(private boiteShinyService: BoiteShinyService) {}

  // Initialisation du composant avec la liste des Pokémon shiny
  ngOnInit(): void {
    this.getShinyList();
  }

  // Méthode pour récupérer la liste des Pokémon shiny paginée
  getPaginatedList() {
    const groupedPokemons = this.getGroupedPokemons(); // Utilisez le regroupement des Pokémon
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // Utilisez la pagination sur les groupes, non sur la liste brute
    return groupedPokemons.slice(startIndex, endIndex);
  }
  
  // Méthode pour récupérer la liste des Pokémon shiny
  getShinyList() {
    this.boiteShinyService.getAllShinies()
      .subscribe ({
        next: (data) => {
          if (data && Array.isArray(data)) {
            this.shinyList = data;
            console.log('Chargement de la liste des Pokémon shiny effectué avec succès');
          } else {
            console.error('Erreur lors du chargement de la liste des Pokémon shiny');
          }
        },
        error: (error) => console.error('Erreur lors du chargement de la liste des Pokémon shiny:', error)
      })
  }

  // Changement de page avec défilement en haut
  goToPage(page: number) {
    this.currentPage = page;
    // Défilement en haut de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Calcul du nombre de pages total
  getTotalPages() {
    const groupedPokemons = this.getGroupedPokemons(); // Utilisez le regroupement des Pokémon
    return Math.ceil(groupedPokemons.length / this.pageSize);
  }
  
  // Méthode pour obtenir les numéros de pages à afficher dans la pagination
  get pageNumbers() {
    const numbers = [];
    for (let i = 1; i <= this.getTotalPages(); i++) {
      numbers.push(i);
    }
    return numbers;
  }
  
  // Méthode pour regrouper les pokemon ayant le même numéro de pokedex
  getGroupedPokemons() {
    const groupedPokemons = [];
    let currentGroup: BoiteShiny[] = [];
    let lastNumDex: string | null = null;

    // Regrouper les Pokémon par leur numéro de Pokédex
    this.shinyList.forEach(pokemon => {
      if (pokemon.numDex === lastNumDex) {
        currentGroup.push(pokemon);
      } else {
        if (currentGroup.length) {
          groupedPokemons.push(currentGroup);
        }
        currentGroup = [pokemon];
        lastNumDex = pokemon.numDex;
      }
    });

    // Ajouter le dernier groupe s'il existe
    if (currentGroup.length) {
      groupedPokemons.push(currentGroup);
    }

    return groupedPokemons;
  }

}
