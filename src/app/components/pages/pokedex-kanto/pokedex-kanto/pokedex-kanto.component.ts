import { Component, OnInit } from '@angular/core';
import { PokedexRegions } from '../../../../models/tables/Pokedex-Regions';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegionSwitcherComponent } from "../../../commons/region-switcher/region-switcher/region-switcher.component";

@Component({
  selector: 'app-pokedex-kanto',
  templateUrl: './pokedex-kanto.component.html',
  styleUrls: ['./pokedex-kanto.component.css'],
    imports: [CommonModule, RouterModule, RegionSwitcherComponent]
})
export class PokedexKantoComponent implements OnInit {
  pokemons: PokedexRegions[] = [];
  isLoading = true;
  errorMessage: string = '';
  currentPage = 1;
  totalPages = 0; 
  columnTextColors: string[] = [
    '#191973',
    '#e3c035', 
    '#87ceeb', 
    '#e94152', 
    '#dda0dd'
  ];
  selectedRegion: string ='Kanto';

  constructor(private pokedexService: PokedexNationalService) {}

  ngOnInit(): void {
    this.fetchKantoPokemons();
  }

  fetchKantoPokemons(): void {
    this.pokedexService.getAllPokemonsFromKanto().subscribe({
      next: (pokemons: PokedexRegions[]) => {
        this.pokemons = pokemons;
        this.isLoading = false;
        this.totalPages = Math.ceil(this.pokemons.length / 10);  // Exemple de calcul de pages
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Une erreur est survenue lors de la récupération des Pokémon de Kanto.';
        console.error('Erreur lors de la récupération des Pokémon de Kanto:', err);
      },
    });
  }

  groupPokemons(): PokedexRegions[][] {
    // Regroupe les Pokémon par une logique (par exemple par leur numéro de Pokédex)
    let groups: PokedexRegions[][] = [];
    let group: PokedexRegions[] = [];
    let lastNumDex = null;

    for (const pokemon of this.pokemons) {
      if (pokemon.numDex !== lastNumDex) {
        if (group.length) {
          groups.push(group);
        }
        group = [pokemon];
        lastNumDex = pokemon.numDex;
      } else {
        group.push(pokemon);
      }
    }
    if (group.length) {
      groups.push(group); // Ajoute le dernier groupe
    }
    return groups;
  }

  // Récupère le rowspan pour un Pokémon, en comptant combien de fois le numDex est présent dans le groupe
  getRowspanForDex(pokemonGroup: PokedexRegions[]): number {
    return pokemonGroup.length;  // Compte combien de Pokémon ont le même numDex
  }

  // Récupère le rowspan pour un nom de Pokémon, en comptant combien de fois le nom est présent dans le groupe
  getRowspanForName(pokemonGroup: PokedexRegions[], pokemon: PokedexRegions): number {
    return pokemonGroup.filter(p => p.nomPokemon === pokemon.nomPokemon).length;  // Compte combien de fois le même nom apparaît
  }

  onRegionSelected(region: string): void {
    this.selectedRegion = region;
  }
}
