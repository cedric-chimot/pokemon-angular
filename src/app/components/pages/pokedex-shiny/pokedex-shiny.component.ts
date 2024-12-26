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

  // Constructeur pour injecter le service de gestion des Pokémon shiny
  constructor(private boiteShinyService: BoiteShinyService) {}

  // Initialisation du composant
  ngOnInit(): void {
    this.getShinyList();
  }

  // Méthode pour récupérer la liste des Pokémon shiny paginée
  getPaginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.shinyList.slice(startIndex, endIndex);
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

  // Changement de page
  goToPage(page: number) {
    this.currentPage = page;
  }

  // Calcul du nombre de pages total
  getTotalPages() {
    return Math.ceil(this.shinyList.length / this.pageSize);
  }

  // Méthode pour obtenir les numéros de pages à afficher dans la pagination
  get pageNumbers() {
    const numbers = [];
    for (let i = 1; i <= this.getTotalPages(); i++) {
      numbers.push(i);
    }
    return numbers;
  }

}
