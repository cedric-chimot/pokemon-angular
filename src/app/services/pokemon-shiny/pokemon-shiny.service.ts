import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatIvManquant } from '../../models/stats/StatIvManquant';
import { PokemonShiny } from '../../models/tables/PokemonShiny';

@Injectable({
  providedIn: 'root'
})
export class PokemonShinyService {
  
  private apiUrl = 'http://localhost:8080/api/pokemonShiny';

  constructor(private http: HttpClient) { }

  // Récupère toutes les données des pokemon shiny.
  getAllShinies(): Observable<PokemonShiny[]> {
    return this.http.get<PokemonShiny[]>(`${this.apiUrl}/all`);
  }

  // Récupère les données des boîtes de Shiny pour une boîte donnée.
  getBoitesShiny(boite: string) {
    return this.http.get<PokemonShiny[]>(`${this.apiUrl}/boites?boite=${boite}`);
  }

  // Récupère les statistiques IVs manquants pour tous les shiny.
  getStatsIvManquants(): Observable<StatIvManquant[]> {
    return this.http.get<StatIvManquant[]>(`${this.apiUrl}/iv-manquants`);
  }

  // Méthode pour récupérer les Pokémon shiny par région
  getShinyPokemonsByRegion(regionId: number): Observable<PokemonShiny[]> {
    return this.http.get<PokemonShiny[]>(`${this.apiUrl}/region/${regionId}`);
  }

}
