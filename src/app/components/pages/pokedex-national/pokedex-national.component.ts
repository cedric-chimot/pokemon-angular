import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokedexNationalService } from '../../../services/pokedex-national/pokedex-national.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokedexRegions } from '../../../models/tables/Pokedex-Regions';
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";
import { RegionSwitcherComponent } from "../../commons/region-switcher/region-switcher.component";

@Component({
  selector: 'app-pokedex-national',
  templateUrl: './pokedex-national.component.html',
  styleUrls: ['./pokedex-national.component.css'],
  imports: [CommonModule, RouterModule, ButtonTopComponent, RegionSwitcherComponent]
})
export class PokedexNationalComponent implements OnInit {
  @Input() region: number = 1; // La région est reçue du parent (regionSwitcher)
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

  // Méthode pour charger les Pokémons par région
  fetchPokemonsByRegion(regionId: number): void {
    this.pokedexService.getPokemonsByRegion(regionId).subscribe({
      next: (pokemons: PokedexRegions[]) => {
        console.log('Pokemons fetched:', pokemons);  // Vérifiez les données
        this.pokemons = pokemons;
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

  // Fonction pour remonter en haut
  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  