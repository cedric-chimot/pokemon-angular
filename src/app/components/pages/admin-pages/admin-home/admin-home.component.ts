import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';
import { PokemonShinyService } from '../../../../services/pokemon-shiny/pokemon-shiny.service';
import { AttaquesService } from '../../../../services/attaques/attaques.service';
import { RegionsService } from '../../../../services/regions/regions.service';
import { ColorsService } from '../../../../services/colors/colors.service';  // À conserver si tu veux utiliser un service pour d'autres fonctionnalités
import { GraphComponent } from "../../../commons/graph/graph.component";

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, RouterModule, GraphComponent],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  // Variables pour le premier graphique (Répartition des attaques par type)
  chartLabelsAttaques: any[] = [];
  chartDataAttaques: any[] = [];
  chartColorsAttaques: any[] = [];

  // Variables pour le second graphique (Répartition des Pokémon par région)
  chartLabelsRegions: any[] = [];
  chartDataRegions: any[] = [];
  chartColorsRegions: any[] = [];

  // Autres variables
  nbPokemons: number = 0;
  nbShiny: number = 0;
  nbDresseurs: number = 0;
  nbRegions: number = 0;
  nbAttaques: number = 0;
  
  // Ajoute une variable pour les Pokémon récupérés
  pokemons: any[] = [];

  constructor(
    private pokedexService: PokedexNationalService,
    private shinyService: PokemonShinyService, 
    private dresseurService: DresseursService,
    private regionService: RegionsService,
    private attaquesService: AttaquesService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.getAllDatas();
    this.getNbAttaquesByTypes();
    this.getNbPokemonsByRegions();
  }

  // Méthode pour récupérer le nombre de Pokémon et autres données
  getAllDatas(): void {
    this.pokedexService.getNbPokemonsInPokedex()
      .subscribe({
        next: (nbPokemons: number) => this.nbPokemons = nbPokemons,
        error: (err: any) => console.error('Error fetching pokemons', err)
      });

    this.shinyService.getNbShinies()
      .subscribe({
        next: (nbShiny: number) => this.nbShiny = nbShiny,
        error: (err: any) => console.error('Error fetching shiny pokemons', err)
      });

    this.dresseurService.getNbDresseurs()
      .subscribe({
        next: (nbDresseurs: number) => this.nbDresseurs = nbDresseurs,
        error: (err: any) => console.error('Error fetching dresseurs', err)
      });

    this.regionService.getNbRegions()
      .subscribe({
        next: (nbRegions: number) => this.nbRegions = nbRegions,
        error: (err: any) => console.error('Error fetching regions', err)
      });

    this.attaquesService.getNbAttaques()
      .subscribe({
        next: (nbAttaques: number) => this.nbAttaques = nbAttaques,
        error: (err: any) => console.error('Error fetching attaques', err)
      });
  }

  // Méthode pour récupérer les attaques par type
  getNbAttaquesByTypes(): void {
    this.attaquesService.getNbAttaquesByType()
      .subscribe({
        next: (nbAttaquesByType: any[]) => {
          this.chartLabelsAttaques = nbAttaquesByType.map(attaque => attaque[0]);
          this.chartDataAttaques = nbAttaquesByType.map(attaque => attaque[1]);
          this.chartColorsAttaques = nbAttaquesByType.map(attaque => 
            this.colorsService.getTypeColor(attaque[0]) || '#000000'
          );
        },
        error: (err: any) => console.error('Erreur lors de la récupération des données:', err)
      });
  }

  // Méthode pour récupérer les Pokémon par région
  getNbPokemonsByRegions(): void {
    this.pokedexService.getNbPokemonsByRegions()
      .subscribe({
        next: (nbPokemonsByRegions: any[]) => {
          this.pokemons = nbPokemonsByRegions; // Stocke les données dans la variable pokemons
          this.chartLabelsRegions = nbPokemonsByRegions.map(region => region[0]);
          this.chartDataRegions = nbPokemonsByRegions.map(region => region[1]);
          this.chartColorsRegions = nbPokemonsByRegions.map(region => 
            this.colorsService.getRegionColor(region[0]) || '#000000'
          );
        },
        error: (err: any) => console.error('Erreur lors de la récupération des données:', err)
      });
  }
}
