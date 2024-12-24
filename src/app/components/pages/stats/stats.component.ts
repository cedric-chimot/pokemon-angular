import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats/stats.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, RouterModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  // Définir les catégories de statistiques
  typeStats = ['dresseurs', 'pokeballs', 'natures', 'sexes', 'types'] as const;
  
  // Définir un objet pour gérer les clés de chaque catégorie
  orderedKeys: { [key in typeof this.typeStats[number]]: any[] } = {
    dresseurs: [],
    pokeballs: [],
    natures: [],
    sexes: [],
    types: []
  };

  boites = [
    { id: 1, nom: 'SHINY FAVORIS' },
    { id: 2, nom: 'SHINY STRATS' },
    { id: 3, nom: 'SHINY STRATS 2' },
    { id: 4, nom: 'SHINY ALOLA' },
    { id: 5, nom: 'SHINY GALAR' },
    { id: 6, nom: 'SHINY PALDEA' },
    { id: 7, nom: 'SHINY LEGENDAIRES' },
    { id: 8, nom: 'SHINY LEGENDAIRES & CO' }
  ];

  currentBoite: string = 'SHINY FAVORIS';
  currentBoiteId: number = 1;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadBoiteStats(this.currentBoiteId);
  }

  // Méthode pour charger les statistiques de la boîte
  loadBoiteStats(boiteId: number): void {
    this.typeStats.forEach((type) => {
      this.statsService.getStatsByType(boiteId, type).subscribe({
        next: (data) => {
          this.orderedKeys[type] = data;
          console.log(`${type} data:`, data);
        },
        error: (error) => {
          console.error(`Erreur lors du chargement des ${type} :`, error);
        }
      });
    });
  }

  // Méthode pour changer de boîte
  switchBoite(id: number): void {
    const boite = this.boites.find((boite) => boite.id === id);
    if (boite) {
      this.currentBoite = boite.nom;
      this.currentBoiteId = boite.id;
      this.loadBoiteStats(this.currentBoiteId);
    }
  }
}
