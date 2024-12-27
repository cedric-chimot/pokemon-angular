import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats/stats.service';  // Assurez-vous d'importer correctement votre service
import { BoiteShinyService } from '../../../services/boites-shiny/boite-shiny.service';
import { GraphComponent } from "../../commons/graph/graph.component"; // Importer également ce service si nécessaire

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

  // Définir des couleurs personnalisées pour les Types, Pokeballs, et Sexes
  typeColors: { [key: string]: string } = {
    Acier: '#5A9190',
    Combat: '#FF6600',
    Dragon: '#0000CC',
    Eau: '#0099FF',
    Electrik: '#FFE200',
    Fée: '#FF66FF',
    Feu: '#FF0000',
    Glace: '#93EAFF',
    Insecte: '#99CC00',
    Normal: '#BFBFBF',
    Plante: '#00CC00',
    Poison: '#993A99',
    Psy: '#FF0066',
    Roche: '#C89058',
    Sol: '#993300',
    Spectre: '#993366',
    Ténèbres: '#4D4D4D',
    Vol: '#6699FF',
  };
  // Définir des couleurs personnalisées pour les Pokéballs
  pokeballColors: { [key: string]: string } = {
    'PokéBall': '#FF6347', // PokeBall - Rouge
    'SuperBall': '#FFD700', // SuperBall - Jaune
    'HyperBall': '#ADFF2F', // HyperBall - Vert
    'BisBall': '#40E0D0',   // BisBall - Turquoise
    'ChronoBall': '#D2691E',// ChronoBall - Marron
    'FaibloBall': '#B0E0E6',// FaibloBall - Bleu pâle
    'FiletBall': '#C71585', // FiletBall - Violet
    'HonorBall': '#DC143C', // HonorBall - Rouge intense
    'LuxeBall': '#FFD700',  // LuxeBall - Jaune doré
    'MémoireBall': '#40E0D0',// MémoireBall - Turquoise
    'RapideBall': '#FF4500', // RapideBall - Orange
    'SafariBall': '#228B22', // SafariBall - Vert forêt
    'ScubaBall': '#4682B4',  // ScubaBall - Bleu acier
    'SoinBall': '#FF1493',   // SoinBall - Rose
    'SombreBall': '#000000', // SombreBall - Noir
    'SpeedBall': '#F4A300',  // SpeedBall - Jaune-orangé
    'MasseBall': '#8B4513',  // MasseBall - Marron foncé
    'AppâtBall': '#FFD700',  // AppâtBall - Jaune
    'LuneBall': '#C0C0C0',   // LuneBall - Argenté
    'LoveBall': '#FF1493',   // LoveBall - Rose
    'CopainBall': '#FF8C00', // CopainBall - Orange foncé
    'RêveBall': '#A9A9A9',   // RêveBall - Gris
    'UltraBall': '#FFD700',  // UltraBall - Jaune doré
    'MasterBall': '#800080', // MasterBall - Violet
  };
  sexeColors: { [key: string]: string } = {
    'Mâle ♂': '#87ceeb',
    'Femelle ♀': '#dda0dd',
    'Assexué Ø': '#6a5acd',
  }; 

  chartData: { [key: string]: number[] } = {};  // Stocke les données pour chaque graphique
  chartLabels: { [key: string]: string[] } = {};  // Stocke les labels pour chaque graphique
  chartColors: { [key: string]: any[] } = {};  // Stocke les couleurs pour chaque graphique

  constructor(
    private statsService: StatsService,
    private boiteShinyService: BoiteShinyService
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
          const color = this.pokeballColors[stat.name];
          return color ? color : '#FFFFFF';  // Si la couleur n'existe pas, utiliser #FFFFFF
        });

        console.log(this.chartColors['pokeballs']);
      },
      error: (error) => console.error('Erreur Pokeballs:', error)
    });

    // Statistiques pour Dresseurs
    this.statsService.getStatsGlobales('Dresseurs')
      .subscribe({
        next: (data: any[]) => {
          this.stats.dresseurs = data;
          this.chartData['dresseurs'] = this.stats.dresseurs.map((stat: { nbShiny: any; }) => stat.nbShiny);
          this.chartLabels['dresseurs'] = this.stats.dresseurs.map((stat: { name: any; }) => stat.name);
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

          // Assignation des couleurs personnalisées pour Sexes
          
          this.chartColors['sexes'] = this.stats.sexes.map((stat: { name: string }) => {
            const color = this.sexeColors[stat.name];
            return color ? color : '#FFFFFF';  // Si la couleur n'existe pas, utiliser #FFFFFF
          });
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

          // Assignation des couleurs personnalisées pour Types
          this.chartColors['types'] = Object.keys(this.typeColors).map(type => this.typeColors[type]);
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
