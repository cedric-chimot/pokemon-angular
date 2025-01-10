import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { StatsShinyService } from '../../../services/stats-shiny/stats-shiny.service';
import { ColorsService } from '../../../services/colors/colors.service';  
import { PokemonShinyService } from '../../../services/pokemon-shiny/pokemon-shiny.service';
import { GraphComponent } from "../../commons/graph/graph.component";
import { StatSwitcherComponent } from "../../commons/stat-switcher/stat-switcher.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-stats-generales',
  templateUrl: './stats-generales.component.html',
  styleUrls: ['./stats-generales.component.css'],
  imports: [CommonModule, RouterModule, GraphComponent, StatSwitcherComponent, ButtonTopComponent]
})
export class StatsGeneralesComponent implements OnInit {
  stats: any = {};
  chartData: { [key: string]: number[] } = {};
  chartLabels: { [key: string]: string[] } = {};
  chartColors: { [key: string]: string[] } = {};
  @Input() categorySelected = 1;
  @Input() categoryChanged = '';

  categories: any[] = [];

  constructor(
    private statsService: StatsShinyService,
    private pokemonShinyService: PokemonShinyService,
    private colorsService: ColorsService,
    private categoriesService: CategoriesService
  ) {}

  // Méthode appelée lors du changement de catégorie
  ngOnInit(): void {
    this.categories = this.getCategories();
    this.getStatsGlobales();
  }

  // Méthode de récupération des statistiques pour une catégorie spécifique
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
      error: (error) => console.error('Erreur :', error),
    });
  }

  // Méthode de récupération des statistiques pour toutes les catégories
  getStatsGlobales(): void {
    // Appel spécifique pour chaque catégorie avec la méthode de couleur correspondante
    this.handleStats('Pokeballs', (name) => this.colorsService.getPokeballColor(name));
    this.handleStats('Natures', (name) => this.colorsService.getNatureColor(name));
    this.handleStats('Sexes', (name) => this.colorsService.getSexeColor(name));
    this.handleStats('Types', (name) => this.colorsService.getTypeColor(name));
  
    // Appel spécifique pour les dresseurs sans couleurs
    this.statsService.getStatsGlobales('Dresseurs').subscribe({
      next: (data: any[]) => {
        this.stats.dresseurs = data;
      },
      error: (error) => console.error('Erreur Dresseurs:', error),
    });
  
    // Appel spécifique pour les IVs manquants
    this.pokemonShinyService.getStatsIvManquants().subscribe({
      next: (data: any[]) => {
        console.log('Données IVs Manquants:', data);
        this.stats['ivManquants'] = data;  // Mise à jour correcte
      },
      error: (error) => console.error('Erreur IVs Manquants:', error),
    });
    this.getPokemonComparisonData();
  }

  // Méthode pour récupérer les catégories de données à afficher
  getCategories() {
    return this.categoriesService.getCategoriesStats().filter(category => 
      ['dresseurs', 'pokeballs', 'types', 'natures', 'ivManquants', 'sexes'].includes(category.dataKey));
  }
  
  // Méthode pour gérer la sélection d'une catégorie
  onCategorySelected(categoryId: number): void {
    this.categorySelected = categoryId;
    this.getStatsGlobales();
  }

  // Méthode pour gérer le changement de catégorie
  onCategoryChanged(categoryName: string): void {
    this.categoryChanged = categoryName;
    this.getStatsGlobales();
  }

  // Méthode pour comparer le total des pokemon shiny et le total pokemon avec des Ivs parfaits
  getPokemonComparisonData(): void {
    // Définir les totaux pour la comparaison
    const totalIvParfaits = 46; 
    const totalPokemonShiny = 180; 
  
    // Remplir les données pour le graphique de comparaison
    this.chartLabels['pokemonComparison'] = ['Total IVs parfaits', 'Total shiny'];
    this.chartData['pokemonComparison'] = [totalIvParfaits, totalPokemonShiny];
    this.chartColors['pokemonComparison'] = [
      '#c71585', 
      '#1b53ba'   
    ];
  }  
  
}