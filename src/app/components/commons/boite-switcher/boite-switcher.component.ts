import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boite-switcher',
  imports: [CommonModule, RouterModule],
  templateUrl: './boite-switcher.component.html',
  styleUrls: ['./boite-switcher.component.css']
})
export class BoiteSwitcherComponent {
  // Liste des boîtes avec leurs classes et noms d'affichage
  boites = [
    { id: 1, nomAffichage: 'SHINY FAVORIS', className: 'btn-shiny-favoris' },
    { id: 2, nomAffichage: 'SHINY STRATS', className: 'btn-shiny-strats' },
    { id: 3, nomAffichage: 'SHINY STRATS 2', className: 'btn-shiny-strats2' },
    { id: 4, nomAffichage: 'SHINY ALOLA', className: 'btn-shiny-alola' },
    { id: 5, nomAffichage: 'SHINY GALAR', className: 'btn-shiny-galar' },
    { id: 6, nomAffichage: 'SHINY PALDEA', className: 'btn-shiny-paldea' },
    { id: 7, nomAffichage: 'SHINY LEGENDAIRES', className: 'btn-shiny-legendaries' },
    // Le dernier bouton avec un nom dynamique selon le contexte
    { id: 8, nomAffichage: '', className: 'btn-shiny-others' },  // Nom vide à initialiser dynamiquement
  ];

  // Mapping entre noms en BDD et noms à afficher
  nomMapping: { [key: string]: string } = {
    'SHINY FAVORIS': 'SHINY FAVORIS',
    'SHINY STRATS': 'SHINY STRATS',
    'SHINY STRATS 2': 'SHINY STRATS 2',
    'SHINY ALOLA': 'SHINY ALOLA',
    'SHINY GALAR': 'SHINY GALAR',
    'SHINY PALDEA': 'SHINY PALDEA',
    'SHINY LEGENDAIRES': 'SHINY LEGENDAIRES',
  };

  // Nom de la boîte actuellement sélectionnée (SHINY FAVORIS par défaut)
  @Input() currentBoite: string = 'SHINY FAVORIS';
  
  // ID de la boîte actuellement sélectionnée
  @Input() currentBoiteId: number = 1; 

  // Contexte pour choisir le nom du dernier bouton (shiny ou stats)
  @Input() contexte: 'shiny' | 'stats' = 'shiny';  // Valeur par défaut "shiny"

  // Événement émis lorsqu'une boîte est sélectionnée
  @Output() boiteChange = new EventEmitter<string>();
  @Output() boiteIdChange = new EventEmitter<number>();

  // Méthode pour changer de boîte et d'ID
  switchBoiteEtId(nomAffichage: string, id: number): void {
    this.boiteChange.emit(nomAffichage); // Émet le nom
    this.boiteIdChange.emit(id);         // Émet l'ID
    this.currentBoite = nomAffichage;    // Met à jour le nom actif
    this.currentBoiteId = id;            // Met à jour l'ID actif
  }
  
  // Méthode pour obtenir le nom d'affichage du dernier bouton (SHINY AUTRES)
  updateDernierBouton(): void {
    const dernierBouton = this.boites[this.boites.length - 1];
    if (this.contexte === 'shiny') {
      dernierBouton.nomAffichage = 'SHINY LÉGENDAIRES ET AUTRES';
    } else {
      dernierBouton.nomAffichage = 'SHINY LÉGENDAIRES & CO';
    }
  }

  // Méthode pour obtenir le nom d'affichage à partir du nom en BDD
  getNomAffichage(nomBDD: string): string {
    return this.nomMapping[nomBDD] || nomBDD; // Retourne le nom mappé ou le nom original si non mappé
  }

  // Assure que le dernier bouton est correctement mis à jour lors du changement de contexte
  ngOnChanges(): void {
    this.updateDernierBouton();
  }
}
