import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoiteShiny } from '../../../models/tables/BoiteShiny';
import { PaginationComponent } from "../../commons/pagination/pagination/pagination.component";
import { BoiteShinyService } from '../../../services/boites-shiny/boite-shiny.service';

@Component({
  selector: 'app-pokedex-shiny',
  imports: [CommonModule, RouterModule, PaginationComponent],
  templateUrl: './pokedex-shiny.component.html',
  styleUrls: ['./pokedex-shiny.component.css']
})
export class PokedexShinyComponent {
  shinyList: BoiteShiny[] = [];
  groupedPokemons: BoiteShiny[][] = [];
  columnTextColors: string[] = [
    '#191973',
    '#e3c035', 
    '#87ceeb', 
    '#e94152', 
    '#dda0dd'
  ];
  pageSize = 24;
  currentPage = 1;

  constructor(private boiteShinyService: BoiteShinyService) {}

  ngOnInit(): void {
    this.getShinyList();
  }

  getPaginatedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.groupedPokemons.slice(startIndex, endIndex);
  }

  getShinyList() {
    this.boiteShinyService.getAllShinies()
      .subscribe({
        next: (data) => {
          if (data && Array.isArray(data)) {
            this.shinyList = data;
            this.groupPokemons();
            console.log('Liste chargée avec succès');
          } else {
            console.error('Erreur lors du chargement des données');
          }
        },
        error: (error) => console.error('Erreur de chargement:', error),
      });
  }

  groupPokemons() {
    let currentGroup: BoiteShiny[] = [];
    let lastNumDex: string | null = null;

    this.shinyList.forEach(pokemon => {
      if (pokemon.numDex === lastNumDex) {
        currentGroup.push(pokemon);
      } else {
        if (currentGroup.length) {
          this.groupedPokemons.push(currentGroup);
        }
        currentGroup = [pokemon];
        lastNumDex = pokemon.numDex;
      }
    });

    if (currentGroup.length) {
      this.groupedPokemons.push(currentGroup);
    }
  }

  getTotalPages() {
    return Math.ceil(this.groupedPokemons.length / this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

