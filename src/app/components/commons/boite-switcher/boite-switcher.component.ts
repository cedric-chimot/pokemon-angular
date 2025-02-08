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
  @Input() boites: any[] = [];

  // Liste des boîtes avec leurs classes et noms d'affichage
  boite = [
    { id: 1, nomAffichage: 'SHINY FAVORIS', className: 'btn-shiny-favoris' },
    { id: 2, nomAffichage: 'SHINY STRATS', className: 'btn-shiny-strats' },
    { id: 3, nomAffichage: 'SHINY STRATS 2', className: 'btn-shiny-strats2' },
    { id: 4, nomAffichage: 'SHINY ALOLA', className: 'btn-shiny-alola' },
    { id: 5, nomAffichage: 'SHINY GALAR', className: 'btn-shiny-galar' },
    { id: 6, nomAffichage: 'SHINY PALDEA', className: 'btn-shiny-paldea' },
    { id: 7, nomAffichage: 'SHINY LÉGENDAIRES', className: 'btn-shiny-legendaries' },
    { id: 8, nomAffichage: 'SHINY LÉGENDAIRES & Co', className: 'btn-shiny-others' },
    { id: 9, nomAffichage: 'SHINY ARCEUS & Cie', className: 'btn-shiny-arceus' }
  ];

  // Nom de la boîte actuellement sélectionnée (SHINY FAVORIS par défaut)
  @Input() currentBoite: string = 'SHINY FAVORIS';

  // ID de la boîte actuellement sélectionnée
  @Input() currentBoiteId: number = 1;

  // Événement émis lorsqu'une boîte est sélectionnée
  @Output() boiteIdChange = new EventEmitter<number>();

  // Méthode pour changer de boîte par ID
  switchBoite(id: number): void {
    this.boiteIdChange.emit(id);
    this.currentBoiteId = id;
  }

}
