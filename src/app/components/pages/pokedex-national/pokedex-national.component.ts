import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokedexNationalService } from '../../../services/pokedex-national/pokedex-national.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokedexRegions } from '../../../models/tables/Pokedex-Regions';
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";
import { RegionSwitcherComponent } from "../../commons/region-switcher/region-switcher.component";
import { SearchBarComponent } from "../../commons/search-bar/search-bar.component";

@Component({
  selector: 'app-pokedex-national',
  standalone: true,
  templateUrl: './pokedex-national.component.html',
  styleUrls: ['./pokedex-national.component.css'],
  imports: [CommonModule, RouterModule, ButtonTopComponent, RegionSwitcherComponent, SearchBarComponent]
})
export class PokedexNationalComponent implements OnInit {
  @Input() region: number = 1; // La région est reçue du parent (regionSwitcher)
  @Output() regionSelected = new EventEmitter<number>();
  pokemons: PokedexRegions[] = [];
  filteredPokemons: PokedexRegions[] = [];
  columnTextColors: string[] = [
    '#191973',
    '#e3c035', 
    '#87ceeb', 
    '#e94152', 
    '#dda0dd'
  ];

  constructor(private pokedexService: PokedexNationalService) {}

  ngOnInit(): void {
    this.fetchPokemonsByRegion(this.region);
  }

  // Méthode pour charger les Pokémons par région
  fetchPokemonsByRegion(regionId: number): void {
    this.pokedexService.getPokemonsByRegion(regionId).subscribe({
      next: (pokemons: PokedexRegions[]) => {
        console.log('Pokemons fetched:', pokemons);  // Vérifiez les données
        this.pokemons = pokemons;
        this.filteredPokemons = pokemons;
      },
      error: (err) => {
        console.error('Error fetching pokemons', err);
      }
    });
  }
  
  // Méthode pour grouper les Pokémons par numéro de Pokédex
  groupPokemons(): PokedexRegions[][] {
    const groups: PokedexRegions[][] = [];
    let group: PokedexRegions[] = [];
    let lastNumDex = null;
  
    for (const pokemon of this.filteredPokemons) {
      if (pokemon.numDex !== lastNumDex) {
        if (group.length) groups.push(group);
        group = [pokemon];
        lastNumDex = pokemon.numDex;
      } else {
        group.push(pokemon);
      }
    }
    if (group.length) groups.push(group);
    return groups;
  }
  
  // Méthode pour changer la région en émettant un événement
  onRegionSelected(regionId: number): void {
    this.region = regionId;
    this.fetchPokemonsByRegion(regionId);  // Rafraîchit les Pokémon pour la nouvelle région
  }

  // Méthode pour récupérer le nom de la région par son ID
  getRegionNameById(regionId: number): string {
    const regionNames: { [id: number]: string } = {
      1: 'Kanto',
      2: 'Johto',
      3: 'Hoenn',
      4: 'Sinnoh',
      5: 'Unys',
      6: 'Kalos',
      7: 'Alola',
      8: 'Galar',
      9: 'Hisui',
      10: 'Paldea',
    };
    return regionNames[regionId] || 'Unknown Region';
  }

  // Méthode pour filtrer les Pokémons par catégories pour effectuer une recherche
  filterPokemons(criteria: { nature: string; dresseur: string; pokeball: string }): void {
    this.filteredPokemons = this.pokemons.filter((pokemon) => {
      const matchNature = criteria.nature
        ? pokemon.nomNature.nomNature.toLowerCase().includes(criteria.nature.toLowerCase())
        : true;
  
      const matchDresseur = criteria.dresseur
        ? pokemon.dresseur.nomDresseur.toLowerCase().includes(criteria.dresseur.toLowerCase()) ||
          pokemon.dresseur.numDresseur.toString().includes(criteria.dresseur)
        : true;
  
      const matchPokeball = criteria.pokeball
        ? pokemon.nomPokeball.nomPokeball.toLowerCase().includes(criteria.pokeball.toLowerCase())
        : true;
  
      return matchNature && matchDresseur && matchPokeball;
    });
  }
  
  // Méthode pour calculer le nombre de colonnes à afficher dans la table
  // Regroupe les numDex identique si nom de pokemon différent
  getRowspanForDex(pokemonGroup: PokedexRegions[]): number {
    return pokemonGroup.length;
  }

  // Méthode pour calculer le nombre de lignes à afficher dans la table pour un nom de Pokémon particulier
  // Regroupe les noms de Pokémon identiques si numDex identique
  getRowspanForName(pokemonGroup: PokedexRegions[], pokemon: PokedexRegions): number {
    return pokemonGroup.filter(p => p.nomPokemon === pokemon.nomPokemon).length;
  }

}
  