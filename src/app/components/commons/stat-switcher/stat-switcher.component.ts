import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stat-switcher',
  imports: [CommonModule, RouterModule],
  templateUrl: './stat-switcher.component.html',
  styleUrls: ['./stat-switcher.component.css']
})
export class StatSwitcherComponent {
  @Input() stats: any;
  @Output() categorySelected = new EventEmitter<number>();
  @Output() categoryChanged = new EventEmitter<string>();

  categoryClasses = [
    { id: 1, nomCategorie: "Dresseurs", className: "btn-dresseur" },
    { id: 2, nomCategorie: "Pokeballs", className: "btn-pokeball" },
    { id: 3, nomCategorie: "Types", className: "btn-type" },
    { id: 4, nomCategorie: "Natures", className: "btn-nature" },
    { id: 5, nomCategorie: "Iv-Manquants", className: "btn-ivs" },
    { id: 6, nomCategorie: "Sexe", className: "btn-sexe" },
    { id: 7, nomCategorie: "Boites", className: "btn-boites" }
  ]; 

  // Méthode pour permettre la sélection des catégories selon l'id ou le nom
  selectCategory(categoryId: number, categoryName: string): void {
    this.categorySelected.emit(categoryId);
    this.categoryChanged.emit(categoryName);
  }
  
  // Méthode pour déterminer si une catégorie doit être affichée
  shouldShowCategory(category: any): boolean {
    switch (category.nomCategorie.toLowerCase()) {
      case 'types':
        return Array.isArray(this.stats['types']) && this.stats['types'].length > 0;
      case 'iv-manquants':
        return Array.isArray(this.stats['ivManquants']) && this.stats['ivManquants'].length > 0;
      case 'boites':
        return Array.isArray(this.stats['boites']) && this.stats['boites'].length > 0;
      case 'sexe':
        return Array.isArray(this.stats['sexes']) && this.stats['sexes'].length > 0;
      default:
        return true;
    }
  }
}