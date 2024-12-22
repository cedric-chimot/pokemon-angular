import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats/stats.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, RouterModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css', '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class StatsComponent implements OnInit {
  dresseurs: any[] = [];
  pokeballs: any[] = [];
  natures: any[] = [];
  types: any[] = [];
  sexes: any[] = [];

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
    // Charger les statistiques pour la boîte par défaut
    this.loadBoiteStats(this.currentBoiteId);
  }

  loadBoiteStats(boiteId: number): void {
    // Charger les statistiques pour les dresseurs
    this.statsService.getDresseursStats(boiteId)
    .subscribe({
      next: (data) => {
        this.dresseurs = data;
        console.log('Dresseurs:', this.dresseurs);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des dresseurs :', error);
      }
    });

    // Charger les statistiques pour les pokeballs
    this.statsService.getPokeballsStats(boiteId)
    .subscribe({
      next: (data) => {
        this.pokeballs = data;
        console.log('Pokeballs:', this.pokeballs);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des pokeballs :', error);
      }
    });

    // Charger les statistiques pour les natures
    this.statsService.getNaturesStats(boiteId)
    .subscribe({
      next: (data) => {
        this.natures = data;
        console.log('Natures:', this.natures);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des natures :', error);
      }
    });

    // Charger les statistiques pour les sexes
    this.statsService.getSexesStats(boiteId)
    .subscribe({
      next: (data) => {
        this.sexes = data;
        console.log('Sexes:', this.sexes);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des sexes :', error);
      }
    });

    // Charger les statistiques pour les types
    this.statsService.getTypesStats(boiteId)
    .subscribe({
      next: (data) => {
        this.types = data;
        console.log('Types:', this.types);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des types :', error);
      }
    });
  }

  switchBoite(id: number): void {
    const boite = this.boites.find((boite) => boite.id === id);
    if (boite) {
      this.currentBoite = boite.nom;
      this.currentBoiteId = boite.id;
      this.loadBoiteStats(this.currentBoiteId); // Charger les statistiques pour la nouvelle boîte sélectionnée
    } else {
      console.error('Boîte non trouvée');
    }
  }
}
