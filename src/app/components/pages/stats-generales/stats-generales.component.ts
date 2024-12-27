import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats/stats.service';
import { ColorsService } from '../../../services/colors/colors.service';  
import { BoiteShinyService } from '../../../services/boites-shiny/boite-shiny.service';
import { GraphComponent } from "../../commons/graph/graph.component"; 

@Component({
  selector: 'app-stats-generales',
  templateUrl: './stats-generales.component.html',
  styleUrls: ['./stats-generales.component.css'],
  imports: [GraphComponent]
})
export class StatsGeneralesComponent implements OnInit {
  stats: any = {
    pokeballs: [],
    dresseurs: [],
    natures: [],
    sexes: [],
    types: []
  };

  ivManquants: any[] = [];  // Utiliser 'any[]' pour un tableau générique

  chartData: { [key: string]: number[] } = {};  // Stocke les données pour chaque graphique
  chartLabels: { [key: string]: string[] } = {};  // Stocke les labels pour chaque graphique
  chartColors: { [key: string]: string[] } = {};  // Stocke les couleurs pour chaque graphique

  constructor(
    private statsService: StatsService,
    private boiteShinyService: BoiteShinyService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.getStatsGlobales();
  }

  getStatsGlobales(): void {
    // Statistiques pour Pokeballs
    this.statsService.getStatsGlobales('Pokeballs')
    .subscribe({
      next: (data: any[]) => {
        this.stats.pokeballs = data;
        this.chartData['pokeballs'] = this.stats.pokeballs.map((stat: { nbShiny: any; }) => stat.nbShiny);
        this.chartLabels['pokeballs'] = this.stats.pokeballs.map((stat: { name: any; }) => stat.name);

        // Assignation des couleurs personnalisées pour chaque Pokéball
        this.chartColors['pokeballs'] = this.stats.pokeballs.map((stat: { name: string }) => {
          return this.colorsService.getPokeballColor(stat.name);
        });
      },
      error: (error) => console.error('Erreur Pokeballs:', error)
    });

    // Statistiques pour Dresseurs
    this.statsService.getStatsGlobales('Dresseurs')
      .subscribe({
        next: (data: any[]) => {
          this.stats.dresseurs = data;
        },
        error: (error) => console.error('Erreur Dresseurs:', error)
      });

    // Statistiques pour Natures
    this.statsService.getStatsGlobales('Natures')
      .subscribe({
        next: (data: any[]) => {
          this.stats.natures = data;
          this.chartData['natures'] = this.stats.natures.map((stat: { nbShiny: any; }) => stat.nbShiny);
          this.chartLabels['natures'] = this.stats.natures.map((stat: { name: any; }) => stat.name);

          this.chartColors['natures'] = this.stats.natures.map((stat: { name: string }) => {
            return this.colorsService.getNatureColor(stat.name);
          });
        },
        error: (error) => console.error('Erreur Natures:', error)
      });

    // Statistiques pour Sexes
    this.statsService.getStatsGlobales('Sexes')
      .subscribe({
        next: (data: any[]) => {
          this.stats.sexes = data;
          this.chartData['sexes'] = this.stats.sexes.map((stat: { nbShiny: any; }) => stat.nbShiny);
          this.chartLabels['sexes'] = this.stats.sexes.map((stat: { name: any; }) => stat.name);

          // Assignation des couleurs pour les sexes
          this.chartColors['sexes'] = this.stats.sexes.map((stat: { name: string }) => {
            return this.colorsService.getSexeColor(stat.name);
          });

          console.log(this.chartColors['sexes']);
        },
        error: (error) => console.error('Erreur Sexes:', error)
      });

    // Statistiques pour Types
    this.statsService.getStatsGlobales('Types')
      .subscribe({
        next: (data: any[]) => {
          this.stats.types = data;
          this.chartData['types'] = this.stats.types.map((stat: { nbShiny: any; }) => stat.nbShiny);
          this.chartLabels['types'] = this.stats.types.map((stat: { name: any; }) => stat.name);

          // Assignation des couleurs pour les types
          this.chartColors['types'] = this.stats.types.map((stat: { name: string }) => {
            return this.colorsService.getTypeColor(stat.name);
          });

          console.log(this.chartColors['types']);
        },
        error: (error) => console.error('Erreur Types:', error)
      });

    this.boiteShinyService.getStatsIvManquants()
      .subscribe({
        next: (data: any[]) => {
          this.ivManquants = data;
        },
        error: (error) => console.error('Erreur IVs Manquants:', error)
      });
  }
}
