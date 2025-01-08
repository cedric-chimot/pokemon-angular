import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stat-switcher',
  imports: [CommonModule, RouterModule],
  templateUrl: './stat-switcher.component.html',
  styleUrls: ['./stat-switcher.component.css']
})
export class StatSwitcherComponent {
  @Input() stats: any;  // Les données des statistiques (à passer depuis le parent)
  @Output() categorySelected = new EventEmitter<number>();  // Pour l'événement de sélection d'une catégorie
  @Output() categoryChanged = new EventEmitter<string>();   // Pour l'événement de changement de catégorie
  
  // Définition des catégories 
  categoryClasses = [
    { id: 1, nomCategorie: "Dresseurs", className: "btn-dresseur" },
    { id: 2, nomCategorie: "Pokeballs", className: "btn-pokeball" },
    { id: 3, nomCategorie: "Types", className: "btn-type" },
    { id: 4, nomCategorie: "Natures", className: "btn-nature" },
    { id: 5, nomCategorie: "Iv-Manquants", className: "btn-ivs" },
    { id: 6, nomCategorie: "Sexe", className: "btn-sexe" }
  ];

  // Méthode pour déclencher l'événement de sélection de catégorie
  selectCategory(categoryId: number, categoryName: string): void {
    this.categorySelected.emit(categoryId);  // Envoie l'id de la catégorie sélectionnée
    this.categoryChanged.emit(categoryName); // Envoie le nom de la catégorie sélectionnée
  }

  shouldShowCategory(category: any): boolean {
    if (category.nomCategorie === 'types') {
        return this.stats?.types?.length > 0;
    }

    if (category.nomCategorie === 'Stats IV Manquants') {
        return this.stats?.ivManquants?.length > 0;
    }

    return true;
}

}
