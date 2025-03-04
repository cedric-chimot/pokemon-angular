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

  // Ajouter un nouveau shiny
  createShiny(shiny: PokemonShiny): Observable<PokemonShiny> {
    return this.http.post<PokemonShiny>(`${this.apiUrl}/create`, shiny);
  }

  // Récupère toutes les données des pokemon shiny.
  getAllShinies(): Observable<PokemonShiny[]> {
    return this.http.get<PokemonShiny[]>(`${this.apiUrl}/all`);
  }

  // Trouver un shiny par son ID (complet)
  getPokemonShinyById(id: number): Observable<PokemonShiny> {
    return this.http.get<PokemonShiny>(`${this.apiUrl}/find/${id}`);
  }

  // Trouver un shiny par son ID (DTO)
  getShinyById(id: number): Observable<PokemonShiny> {
    return this.http.get<PokemonShiny>(`${this.apiUrl}/${id}`);
  }

  // Récupère les données des boîtes de Shiny pour une boîte donnée.
  getBoitesShiny(boite: string) {
    return this.http.get<PokemonShiny[]>(`${this.apiUrl}/boites?boite=${boite}`);
  }

  // Récupère les Pokémon d'une boîte donnée via son ID
  getBoitesShinyById(idBoite: number) {
    return this.http.get<PokemonShiny[]>(`${this.apiUrl}/idBoites?idBoite=${idBoite}`);
  }

  // Récupère les statistiques IVs manquants pour tous les shiny.
  getStatsIvManquants(): Observable<StatIvManquant[]> {
    return this.http.get<StatIvManquant[]>(`${this.apiUrl}/iv-manquants`);
  }

  // Méthode pour récupérer les Pokémon shiny par région
  getShinyPokemonsByRegion(regionId: number): Observable<PokemonShiny[]> {
    return this.http.get<PokemonShiny[]>(`${this.apiUrl}/region/${regionId}`);
  }

  // Récupère le nombre de pokémons shiny
  getNbShinies(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // Mettre à jour un shiny
  updatePokemonShiny(shiny: PokemonShiny): Observable<PokemonShiny> {
    return this.http.patch<PokemonShiny>(`${this.apiUrl}/update`, shiny);
  }

  // Supprimer un shiny par son ID
  deletePokemonShinyById(id: number): Observable<PokemonShiny> {
    return this.http.delete<PokemonShiny>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les shiny
  deleteAllPokemonsShiny(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
