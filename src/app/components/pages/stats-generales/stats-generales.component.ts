import { Component, OnInit } from '@angular/core';
import { StatsShinyService } from '../../../services/stats-shiny/stats-shiny.service';
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
  stats: any = {};
  ivManquants: any[] = [];
  chartData: { [key: string]: number[] } = {};
  chartLabels: { [key: string]: string[] } = {};
  chartColors: { [key: string]: string[] } = {};

  constructor(
    private statsService: StatsShinyService,
    private boiteShinyService: BoiteShinyService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.getStatsGlobales();
  }

  private handleStats(
    category: string,
    colorServiceMethod: (name: string) => string
  ): void {
    this.statsService.getStatsGlobales(category).subscribe({
      next: (data: any[]) => {
        this.stats[category.toLowerCase()] = data;
        this.chartData[category.toLowerCase()] = data.map((stat: { nbShiny: number }) => stat.nbShiny);
        this.chartLabels[category.toLowerCase()] = data.map((stat: { name: string }) => stat.name);
        this.chartColors[category.toLowerCase()] = data.map((stat: { name: string }) => colorServiceMethod(stat.name));
      },
      error: (error) => console.error(`Erreur ${category}:`, error),
    });
  }

  getStatsGlobales(): void {
    this.handleStats('Pokeballs', this.colorsService.getPokeballColor.bind(this.colorsService));
    this.handleStats('Natures', this.colorsService.getNatureColor.bind(this.colorsService));
    this.handleStats('Sexes', this.colorsService.getSexeColor.bind(this.colorsService));
    this.handleStats('Types', this.colorsService.getTypeColor.bind(this.colorsService));

    // Appel spécifique pour les dresseurs sans couleurs
    this.statsService.getStatsGlobales('Dresseurs').subscribe({
      next: (data: any[]) => {
        this.stats.dresseurs = data;
      },
      error: (error) => console.error('Erreur Dresseurs:', error),
    });

    // Appel spécifique pour les IVs manquants
    this.boiteShinyService.getStatsIvManquants().subscribe({
      next: (data: any[]) => {
        this.ivManquants = data;
      },
      error: (error) => console.error('Erreur IVs Manquants:', error),
    });
  }
}
