import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoitesPokedexService } from '../../../services/boites-pokedex/boites-pokedex.service';
import { ColorsService } from '../../../services/colors/colors.service';
import { DresseursService } from '../../../services/dresseurs/dresseurs.service';
import { NaturesService } from '../../../services/natures/natures.service';
import { PokeballsService } from '../../../services/pokeballs/pokeballs.service';
import { GraphComponent } from '../../commons/graph/graph.component';
import { StatSwitcherComponent } from "../../commons/stat-switcher/stat-switcher.component";
import { CategoriesService } from '../../../services/categories/categories.service';
import { ButtonTopComponent } from "../../commons/button-top/button-top.component";

@Component({
  selector: 'app-stats-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule, GraphComponent, StatSwitcherComponent, ButtonTopComponent],
  templateUrl: './stats-pokedex.component.html',
  styleUrls: ['./stats-pokedex.component.css']
})
export class StatsPokedexComponent implements OnInit {
  stats: any = {};
  chartData: { [key: string]: number[] } = {};
  chartLabels: { [key: string]: string[] } = {};
  chartColors: { [key: string]: string[] } = {};
  chartTitle: string = '';
  @Input() categorySelected = 1;
  @Input() categoryChanged = '';

  categories: any[] = []; // Initialiser comme un tableau vide
  idRegionDresseur: number = 1;

  constructor(
    private dresseurService: DresseursService,
    private natureService: NaturesService,
    private pokeballService: PokeballsService,
    private boiteService: BoitesPokedexService,
    private colorsService: ColorsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categories = this.getCategories();
    this.getStatsPokedex();
    this.getStatsDresseurs();
    this.shouldShowButton(this.idRegionDresseur);
  }

  // Méthode pour récupérer les données des dresseurs
  getStatsDresseurs() {
    // Récupère la première partie de la région 1 (Ids 1 à 40)
    this.dresseurService.getAllDresseursRegion1Part1().subscribe({
        next: (data: any[]) => {
            this.stats.dresseursRegion1Part1 = data; // Récupère la première partie de la région 1
            // Récupère la deuxième partie de la région 1 (Ids 41 à 81)
            this.dresseurService.getAllDresseursRegion1Part2().subscribe({
                next: (data: any[]) => {
                    this.stats.dresseursRegion1Part2 = data; // Récupère la deuxième partie de la région 1
                    // Récupère les dresseurs de la région 2
                    this.dresseurService.getAllDresseursRegion2().subscribe({
                        next: (data: any[]) => {
                            this.stats.dresseursRegion2 = data; // Récupère les dresseurs de la région 2
                            // Récupère les dresseurs de la région 3
                            this.dresseurService.getAllDresseursRegion3().subscribe({
                                next: (data: any[]) => {
                                    this.stats.dresseursRegion3 = data; // Récupère les dresseurs de la région 3
                                },
                                error: (error) => console.error('Erreur Dresseurs Region 4:', error),
                            });
                        },
                        error: (error) => console.error('Erreur Dresseurs Region 3:', error),
                    });
                },
                error: (error) => console.error('Erreur Dresseurs Region 2:', error),
            });
        },
      error: (error) => console.error('Erreur Dresseurs Region 1:', error),
    });
  }

  // Méthode pour récupérer toutes les données des autres catégories
  getStatsPokedex(): void {
    // Récupérer les données des Pokéballs
    this.pokeballService.getAllPokeballsForPokedex().subscribe({
      next: (pokeball: any[]) => {
        this.stats.pokeballs = pokeball;
        this.chartLabels['pokeballs'] = pokeball.map((pokeball: { nomPokeball: string }) => pokeball.nomPokeball);
        this.chartData['pokeballs'] = pokeball.map((pokeball: { nbPokemon: number }) => pokeball.nbPokemon);
        this.chartColors['pokeballs'] = pokeball.map((pokeball: { nomPokeball: string }) =>
          this.colorsService.getPokeballColor(pokeball.nomPokeball)
        );
      },
      error: (error) => console.error('Erreur Pokeballs:', error),
    });

    // Récupérer les données des Natures
    this.natureService.getAllNatures().subscribe({
      next: (nature: any[]) => {
        this.stats.natures = nature;
        this.chartLabels['natures'] = nature.map((nature: { nomNature: string }) => nature.nomNature);
        this.chartData['natures'] = nature.map((nature: { nbPokemon: number }) => nature.nbPokemon);
        this.chartColors['natures'] = nature.map((nature: { nomNature: string }) =>
          this.colorsService.getNatureColor(nature.nomNature)
        );
      },
      error: (error) => console.error('Erreur Natures:', error),
    });

    // Récupérer les données des boîtes
    this.boiteService.getAllBoitesPokedex().subscribe({
      next: (boite: any[]) => {
        this.stats['boites'] = boite;

        // Calculs des totaux
        const totaux = {
          males: 0,
          femelles: 0,
          assexues: 0,
          level100: 0
        };

        // Calcul des totaux par colonne
        boite.forEach((boite: any) => {
          totaux.males += boite.nbMales;
          totaux.femelles += boite.nbFemelles;
          totaux.assexues += boite.nbAssexues;
          totaux.level100 += boite.nbLevel100;
        });

        // Ajouter les totaux par colonne à la statistique
        this.stats.totauxParColonne = totaux;

        // Créer les labels et données pour le graphique des boîtes par genres
        const genreLabels = ['Mâle ♂', 'Femelle ♀', 'Assexué Ø'];

        this.chartLabels['boites'] = ['Mâles', 'Femelles', 'Assexués'];
        this.chartData['boites'] = [
          totaux.males,
          totaux.femelles,
          totaux.assexues
        ];
        this.chartColors['boites'] = genreLabels.map(label =>
          this.colorsService.getSexeColor(label)
        );
        this.getPokemonComparisonData();
      },
      error: (error) => {
        console.error('Erreur Boites:', error);
      },
    });
  }

  // Méthode pour comparer le total des pokemon et le total de niveau 100
  // pour l'afficher dans un graphique
  getPokemonComparisonData(): void {
    // Définir les totaux pour la comparaison
    const totalPokemon = 1032; 
    const totalLevel100 = 396; 

    // Remplir les données pour le graphique de comparaison
    this.chartLabels['pokemonComparison'] = ['Total Pokémon', 'Total Niveau 100'];
    this.chartData['pokemonComparison'] = [totalPokemon, totalLevel100];
    this.chartColors['pokemonComparison'] = [
      '#1b53ba', 
      '#c71585'   
    ];
  } 
  
  // Méthode pour récupérer les catégories disponibles
  getCategories() {
    return this.categoriesService.getCategoriesPokedex();
  }
  
  
  // Méthode pour gérer la sélection d'une catégorie
  onCategorySelected(categoryId: number): void {
    this.categorySelected = categoryId;
    this.getStatsPokedex();
  }

  // Méthode pour gérer le changement de catégorie
  onCategoryChanged(categoryName: string): void {
    this.categoryChanged = categoryName;  
    this.idRegionDresseur = 1; // Réinitialiser à la région 1
  
    // Mettre à jour les statistiques pour les autres catégories
    this.getStatsPokedex();
    this.getStatsDresseurs();
  }
  
  // Met à jour idRegionDresseur et recharge les données
  changeRegionDresseur(regionId: number): void {
    this.idRegionDresseur = regionId;
    this.getStatsDresseurs();
  }

  // Vérifie si le bouton ppur remonter en haut de page doit être affiché
  shouldShowButton(idRegionDresseur: number): boolean {
    return idRegionDresseur !== 3;
  }
  
}
