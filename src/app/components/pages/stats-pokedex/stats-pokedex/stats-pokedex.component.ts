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
    this.dresseurService.getAllDresseurs().subscribe({
      next: (data: any[]) => {
        this.stats.dresseurs = data;
      },
      error: (error) => console.error('Erreur Dresseurs:', error),
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
  }
}
