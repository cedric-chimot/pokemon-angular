import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchCriteria = new EventEmitter<{ pokemon: string; nature: string; dresseur: string; pokeball: string }>();

  pokemon: string = '';
  nature: string = '';
  dresseur: string = '';
  pokeball: string = '';

  // Méthode pour rechercher de pokemons selon certains critères
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
    // Réinitialise les champs de saisie
    this.pokemon = '';
    this.nature = '';
    this.dresseur = '';
    this.pokeball = '';
  
    // Réémet un événement avec des critères vides pour réinitialiser le filtre
    this.searchCriteria.emit({ pokemon: '', nature: '', dresseur: '', pokeball: '' });
  }
  
}
