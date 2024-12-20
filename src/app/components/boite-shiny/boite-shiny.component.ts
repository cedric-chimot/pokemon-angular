import { Component, OnInit } from '@angular/core';
import { BoiteShinyService } from '../../services/boite-shiny.service';
import { BoiteShiny } from '../../models/BoiteShiny';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boite-shiny',
  imports: [CommonModule, RouterModule],
  templateUrl: './boite-shiny.component.html',
  styleUrl: './boite-shiny.component.css'
})
export class BoiteShinyComponent implements OnInit  {
  pokemonList: BoiteShiny[] = [];
  currentBoite: string = 'SHINY FAVORIS';

  constructor(private boiteShinyService: BoiteShinyService) { }

  ngOnInit(): void {
      this.loadBoiteShiny(this.currentBoite);
  }
  // Méthode pour charger la liste des Pokémon d'une boîte spécifique
  loadBoiteShiny(boite: string) {
    this.boiteShinyService.getBoitesShiny(boite)
      .subscribe({
        next: (data) => {
          this.pokemonList = data;
          console.log('Chargement des Pokémon de la boîte effectué avec succès');
        },
        error: (error) => {
          console.error('Erreur lors du chargement des Pokémon de la boîte :', error);
          if (error.error) {
            console.error('Détails de l\'erreur :', error.error);
          }
        }
      });
  }

  // Méthode pour changer de boîte
  switchBoite(boite: string): void {
    this.currentBoite = boite;
    this.loadBoiteShiny(boite);
  }

}
