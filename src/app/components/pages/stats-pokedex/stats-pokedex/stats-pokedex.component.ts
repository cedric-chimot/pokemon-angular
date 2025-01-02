import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { NaturesService } from '../../../../services/natures/natures.service';
import { PokeballsService } from '../../../../services/pokeballs/pokeballs.service';
import { BoitesPokedexService } from '../../../../services/boites-pokedex/boites-pokedex.service';
import { GraphComponent } from '../../../commons/graph/graph.component';
import { ColorsService } from '../../../../services/colors/colors.service';

@Component({
  selector: 'app-stats-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule, GraphComponent],
  templateUrl: './stats-pokedex.component.html',
  styleUrls: ['./stats-pokedex.component.css']
})
export class StatsPokedexComponent implements OnInit {
  stats: any = {};
  chartData: { [key: string]: number[] } = {};
  chartLabels: { [key: string]: string[] } = {};
  chartColors: { [key: string]: string[] } = {};

  constructor(
    private dresseurService: DresseursService,
    private natureService: NaturesService,
    private pokeballService: PokeballsService,
    private boiteService: BoitesPokedexService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.getStatsPokedex();
  }

  getStatsPokedex(): void {
    // Récupérer les données des dresseurs
    this.dresseurService.getAllDresseursGen1().subscribe({
      next: (data: any[]) => {
        this.stats.dresseursGen1 = data;
  
        // Une fois que les dresseurs de la génération 1 sont récupérés, on récupère ceux de la génération 2
        this.dresseurService.getAllDresseursGen2().subscribe({
          next: (data: any[]) => {
            this.stats.dresseursGen2 = data;
          },
          error: (error) => console.error('Erreur Dresseurs Gen2:', error),
        });
      },
      error: (error) => console.error('Erreur Dresseurs Gen1:', error),
    });
  
    // Récupérer les données des pokeballs
    this.pokeballService.getAllPokeballs().subscribe({
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
  
    // Récupérer toutes les données des boites de Pokédex et les afficher en graphique
    this.boiteService.getAllBoitesPokedex().subscribe({
      next: (boite: any[]) => {
        this.stats.boites = boite;
    
        // Initialiser les totaux avant d'effectuer les calculs
        this.stats.totauxParColonne = {
          males: 0,
          femelles: 0,
          assexues: 0,
          level100: 0
        };
    
        boite.forEach((boite: any) => {
          this.stats.totauxParColonne.males += boite.nbMales;
          this.stats.totauxParColonne.femelles += boite.nbFemelles;
          this.stats.totauxParColonne.assexues += boite.nbAssexues;
          this.stats.totauxParColonne.level100 += boite.nbLevel100;
        });
    
        const genreLabels = ['Mâle ♂', 'Femelle ♀', 'Assexué Ø'];
    
        this.chartLabels['boites'] = ['Mâles', 'Femelles', 'Assexués'];
        this.chartData['boites'] = [
          this.stats.totauxParColonne.males,
          this.stats.totauxParColonne.femelles,
          this.stats.totauxParColonne.assexues
        ];
        this.chartColors['boites'] = genreLabels.map(label =>
          this.colorsService.getSexeColor(label)
        );
        this.getPokemonComparisonData();
      },
      error: (error) => console.error('Erreur Boites:', error),
    });
  }

  // Méthode pour comparer le total des pokemon et le total de niveau 100
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
  
}
