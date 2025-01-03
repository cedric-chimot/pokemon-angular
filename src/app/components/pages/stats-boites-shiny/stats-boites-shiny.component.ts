import { Component, OnInit } from '@angular/core';
import { StatsShinyService } from '../../../services/stats-shiny/stats-shiny.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoiteSwitcherComponent } from "../../commons/boite-switcher/boite-switcher.component";

@Component({
  selector: 'app-stats',
  imports: [CommonModule, RouterModule, BoiteSwitcherComponent],
  templateUrl: './stats-boites-shiny.component.html',
  styleUrls: ['./stats-boites-shiny.component.css']
})
export class StatsBoitesComponent implements OnInit {
  typeStats = ['dresseurs', 'pokeballs', 'natures', 'sexes', 'types'] as const;
  
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
    { id: 8, nom: 'SHINY LEGENDAIRES & Co' }
  ];

  currentBoite: string = 'SHINY FAVORIS';
  currentBoiteId: number = 1;

  constructor(private statsService: StatsShinyService) {}

  ngOnInit(): void {
    this.loadBoiteStats(this.currentBoiteId);
  }

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

  switchBoite(boiteId: number): void {
    const boite = this.boites.find((boite) => boite.id === boiteId);
    if (boite) {
      this.currentBoite = boite.nom;
      this.currentBoiteId = boite.id;
      this.loadBoiteStats(this.currentBoiteId);
    }
  }
}
