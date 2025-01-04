import { Component, OnInit } from '@angular/core';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';
import { Pokedex } from '../../../../models/tables/Pokedex';
import { PaginationComponent } from "../../../commons/pagination/pagination/pagination.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokedex-national',
  templateUrl: './pokedex-national.component.html',
  styleUrls: ['./pokedex-national.component.css'],
  imports: [CommonModule, RouterModule, PaginationComponent]
})
export class PokedexNationalComponent implements OnInit {
  pokedexList: Pokedex[] = [];  // Liste des Pokémon à afficher
  allPokemons: Pokedex[] = [];  // Tous les Pokémon récupérés
  totalPages = 0; // Total des pages à afficher
  currentPage = 1; // Page actuelle
  pageSize = 100; // Nombre de Pokémon par page
  columnTextColors: string[] = [
    '#191973',
    '#e3c035', 
    '#87ceeb', 
    '#e94152', 
    '#dda0dd'
  ];

  constructor(private pokedexService: PokedexNationalService) {}

  ngOnInit(): void {
    this.getAllPokemons(); // Charger tous les Pokémon dès le début
  }

  // Récupère tous les Pokémon
  getAllPokemons(): void {
    this.pokedexService.getAllPokemonsFromPokedex().subscribe({
      next: (pokemons: Pokedex[]) => {
        this.allPokemons = this.formatPokemons(pokemons);
        this.updatePokedexList();  // Met à jour la liste des Pokémon à afficher
      },
      error: (err) => console.error('Erreur lors du chargement du Pokédex:', err),
    });
  }

  // Formate les Pokémon pour ajouter des valeurs par défaut si nécessaire
  formatPokemons(pokemons: Pokedex[]): Pokedex[] {
    return pokemons.map(pokemon => ({
      ...pokemon,
      naturePokedex: pokemon.naturePokedex || { nomNature: 'Non défini' },
      pokeballPokedex: pokemon.pokeballPokedex || { nomPokeball: 'Inconnue' },
      dresseurPokedex: pokemon.dresseurPokedex || { numDresseur: '00000', nomDresseur: 'Inconnu' }
    }));
  }

  // Met à jour la liste des Pokémon à afficher pour la page actuelle
  updatePokedexList(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pokedexList = this.allPokemons.slice(startIndex, endIndex);  // Tranche les Pokémon à afficher
    
    // Calculer le nombre total de pages
    this.totalPages = Math.ceil(this.allPokemons.length / this.pageSize);
  }

  // Méthode de pagination (simplifiée)
  paginatePokemons(page: number): void {
    this.currentPage = page; // Met à jour la page actuelle
    this.updatePokedexList(); // Met à jour la liste des Pokémon à afficher
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Regroupe les Pokémon par numDex et gère la fusion des noms
  groupPokemons(): Pokedex[][] {
    const groupedPokemons: Pokedex[][] = [];
    let currentGroup: Pokedex[] = [];
    let currentDexNumber = '';
  
    this.pokedexList.forEach(pokemon => {
      if (pokemon.numDex === currentDexNumber) {
        currentGroup.push(pokemon); // On garde le même groupe si le numDex est identique
      } else {
        if (currentGroup.length > 0) groupedPokemons.push(currentGroup); // On ajoute le groupe précédent
        currentGroup = [pokemon]; // Nouveau groupe pour un numDex différent
        currentDexNumber = pokemon.numDex; // On met à jour le numDex du groupe
      }
    });

    // Ajouter le dernier groupe
    if (currentGroup.length > 0) groupedPokemons.push(currentGroup);

    return groupedPokemons;
  }

  goToPage(page: number): void {
    this.currentPage = page;   // Met à jour la page actuelle
    this.updatePokedexList();  // Met à jour la liste des Pokémon à afficher
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Remonte la page
  }

  // Récupère le rowspan pour un Pokémon, en comptant combien de fois le numDex est présent dans le groupe
  getRowspanForDex(pokemonGroup: Pokedex[]): number {
    return pokemonGroup.length;  // Compte combien de Pokémon ont le même numDex
  }

  // Récupère le rowspan pour un nom de Pokémon, en comptant combien de fois le nom est présent dans le groupe
  getRowspanForName(pokemonGroup: Pokedex[], pokemon: Pokedex): number {
    return pokemonGroup.filter(p => p.nomPokemon === pokemon.nomPokemon).length;  // Compte combien de fois le même nom apparaît
  }
}
