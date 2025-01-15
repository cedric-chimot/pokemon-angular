import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dresseur } from '../../../models/tables/Dresseur';
import { PokeballsService } from '../../../services/pokeballs/pokeballs.service';
import { NaturesService } from '../../../services/natures/natures.service';
import { DresseursService } from '../../../services/dresseurs/dresseurs.service';
import { Nature } from '../../../models/tables/Nature';
import { Pokeball } from '../../../models/tables/PokeBall';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchCriteria = new EventEmitter<{ pokemon: string; nature: string; dresseur: string; pokeball: string }>();

  pokemon: string = '';
  nature: string = '';
  dresseur: string = '';
  pokeball: string = '';

  natures: Nature[] = [];
  dresseurs: Dresseur[] = [];
  pokeballs: Pokeball[] = [];

  constructor(
    private pokeballsService: PokeballsService,
    private natureService: NaturesService,
    private dresseurService: DresseursService) {}

  ngOnInit() {
    this.getAllDatas();
  }

  // Méthode pour récupérer toutes les données nécessaires
  getAllDatas(): void {
    this.natureService.getAllNaturesInPokedex().subscribe((natures) => {
      this.natures = natures;
    });

    this.pokeballsService.getAllPokeballsInPokedex().subscribe((pokeballs) => {
      this.pokeballs = pokeballs;
    });

    this.dresseurService.getAllDresseurs().subscribe((dresseurs) => {
      this.dresseurs = dresseurs;
    });
  }

  // Méthode pour rechercher des pokemons selon certains critères
  onSearch() {
    this.searchCriteria.emit({
      pokemon: this.pokemon, 
      nature: this.nature,
      dresseur: this.dresseur,
      pokeball: this.pokeball,
    });
  }

  // Méthode pour réinitialiser les champs de saisie et émettre un événement vide
  onReset() {
    this.pokemon = '';
    this.nature = '';
    this.dresseur = '';
    this.pokeball = '';
    this.searchCriteria.emit({ pokemon: '', nature: '', dresseur: '', pokeball: '' });
  }
}
