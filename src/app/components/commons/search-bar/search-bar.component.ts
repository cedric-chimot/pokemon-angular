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
  @Output() searchCriteria = new EventEmitter<{ nature: string; dresseur: string; pokeball: string }>();

  nature: string = '';
  dresseur: string = '';
  pokeball: string = '';

  // Méthode pour rechercher de pokemons selon certains critères
  onSearch() {
    this.searchCriteria.emit({
      nature: this.nature,
      dresseur: this.dresseur,
      pokeball: this.pokeball,
    });
  }

  // Méthode pour réinitialiser les champs de saisie et émettre un événement vide
  onReset() {
    // Réinitialise les champs de saisie
    this.nature = '';
    this.dresseur = '';
    this.pokeball = '';
  
    // Réémet un événement avec des critères vides pour réinitialiser le filtre
    this.searchCriteria.emit({ nature: '', dresseur: '', pokeball: '' });
  }
  
}
