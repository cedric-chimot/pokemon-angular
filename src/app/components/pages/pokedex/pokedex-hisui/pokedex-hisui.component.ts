import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokedexRegions } from '../../../../models/tables/Pokedex-Regions';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegionSwitcherComponent } from '../../../commons/region-switcher/region-switcher/region-switcher.component';

@Component({
  selector: 'app-pokedex-hisui',
  imports: [CommonModule, RouterModule, RegionSwitcherComponent],
  templateUrl: './pokedex-hisui.component.html',
  styleUrls: ['./pokedex-hisui.component.css']
})
export class PokedexHisuiComponent implements OnInit {
  @Input() region: number = 9;
  @Output() regionSelected = new EventEmitter<number>();
  pokemons: PokedexRegions[] = [];
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

  fetchPokemonsByRegion(regionId: number): void {
    this.pokedexService.getPokemonsByRegion(regionId).subscribe({
      next: (pokemons: PokedexRegions[]) => {
        this.pokemons = pokemons;
      },
      error: (err) => {
        console.error('Error fetching pokemons', err);
      }
    });
  }

  groupPokemons(): PokedexRegions[][] {
    const groups: PokedexRegions[][] = [];
    let group: PokedexRegions[] = [];
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
    this.fetchPokemonsByRegion(regionId);
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

  getRowspanForDex(pokemonGroup: PokedexRegions[]): number {
    return pokemonGroup.length;
  }

  getRowspanForName(pokemonGroup: PokedexRegions[], pokemon: PokedexRegions): number {
    return pokemonGroup.filter(p => p.nomPokemon === pokemon.nomPokemon).length;
  }
}
