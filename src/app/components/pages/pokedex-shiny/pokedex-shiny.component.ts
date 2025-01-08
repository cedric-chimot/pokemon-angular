import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonShiny } from '../../../models/tables/PokemonShiny';
import { PokemonShinyService } from '../../../services/pokemon-shiny/pokemon-shiny.service';
import { RegionSwitcherComponent } from "../../commons/region-switcher/region-switcher.component";
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";

@Component({
  selector: 'app-pokedex-shiny',
  imports: [CommonModule, RouterModule, RegionSwitcherComponent, ButtonTopComponent],
  templateUrl: './pokedex-shiny.component.html',
  styleUrls: ['./pokedex-shiny.component.css']
})
export class PokedexShinyComponent {
  @Input() region: number = 1; // La région est reçue du parent (regionSwitcher)
  @Output() regionSelected = new EventEmitter<number>();
  pokemons: PokemonShiny[] = [];
  columnTextColors: string[] = [
    '#191973',
    '#e3c035', 
    '#87ceeb', 
    '#e94152', 
    '#dda0dd'
  ];

  constructor(private pokemonShinyService: PokemonShinyService) {}

  ngOnInit(): void {
    this.fetchPokemonsByRegion(this.region);
  }

  fetchPokemonsByRegion(regionId: number): void {
    this.pokemonShinyService.getShinyPokemonsByRegion(regionId).subscribe({
      next: (pokemons: PokemonShiny[]) => {
        console.log('Pokemons fetched:', pokemons);  // Vérifiez les données
        this.pokemons = pokemons;
      },
      error: (err) => {
        console.error('Error fetching pokemons', err);
      }
    });
  }
  
  groupPokemons(): PokemonShiny[][] {
    const groups: PokemonShiny[][] = [];
    let group: PokemonShiny[] = [];
    let lastNumDex = null;

    for (const pokemon of this.pokemons) {
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

  onRegionSelected(regionId: number): void {
    this.region = regionId;
    this.fetchPokemonsByRegion(regionId);  // Rafraîchit les Pokémon pour la nouvelle région
  }

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

  // Fonction pour remonter en haut
  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }  

  getRowspanForDex(pokemonGroup: PokemonShiny[]): number {
    return pokemonGroup.length;
  }

  getRowspanForName(pokemonGroup: PokemonShiny[], pokemon: PokemonShiny): number {
    return pokemonGroup.filter(p => p.nomPokemon === pokemon.nomPokemon).length;
  }

}
  