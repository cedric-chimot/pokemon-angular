import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats/stats.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stats-generales',
  imports: [CommonModule, RouterModule],
  templateUrl: './stats-generales.component.html',
  styleUrls: ['./stats-generales.component.css']
})
export class StatsGeneralesComponent implements OnInit {
  stats: any = {  // Pour stocker toutes les statistiques par type
    pokeballs: [],
    dresseurs: [],
    natures: [],
    sexes: [],
    types: []
  };

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.getStatsGlobales();  // Appel initial pour charger toutes les stats globales
  }

  // Méthode pour récupérer toutes les statistiques globales
  getStatsGlobales(): void {
    this.statsService.getStatsGlobales('Pokeballs')
      .subscribe({
        next: (data) => {
          this.stats.pokeballs = data;  // Stocke les stats des Pokeballs
          console.log('Pokeballs:', this.stats.pokeballs);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des Pokeballs :', error);
        }
      });

    this.statsService.getStatsGlobales('Dresseurs')
      .subscribe({
        next: (data) => {
          this.stats.dresseurs = data;  // Stocke les stats des Dresseurs
          console.log('Dresseurs:', this.stats.dresseurs);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des Dresseurs :', error);
        }
      });

    this.statsService.getStatsGlobales('Natures')
      .subscribe({
        next: (data) => {
          this.stats.natures = data;  // Stocke les stats des Natures
          console.log('Natures:', this.stats.natures);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des Natures :', error);
        }
      });

    this.statsService.getStatsGlobales('sexes')
      .subscribe({
        next: (data) => {
          this.stats.sexes = data;  // Stocke les stats des Sexes
          console.log('Sexes:', this.stats.sexes);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des Sexes :', error);
        }
      });

    this.statsService.getStatsGlobales('types')
      .subscribe({
        next: (data) => {
          this.stats.types = data;  // Stocke les stats des Types
          console.log('Types:', this.stats.types);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des Types :', error);
        }
      });
  }
}
