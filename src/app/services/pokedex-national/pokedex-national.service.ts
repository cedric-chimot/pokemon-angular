import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokedex } from '../../models/tables/Pokedex';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PokedexNationalService {
  private apiUrl = 'http://localhost:8080/api/pokedexNational';

  constructor(private http: HttpClient) { }

  // Récupère toutes les données des pokémons du pokedex national.
  getAllPokemonsFromPokedex(): Observable<Pokedex[]> {
    return this.http.get<Pokedex[]>(`${this.apiUrl}/find/all`);
  }

  /**
   * Récupérer tous les pokemons d'une région donnée
   * @param region la région recherchée
   * @returns la liste des pokemons de la région
   */
  getAllPokemonsByRegion(region: string): Observable<Pokedex[]> {
    return this.http.get<Pokedex[]>(`${this.apiUrl}/find/${region}`);
  }

  // Récupère les données d'un pokémon du pokedex national par son Id.
  getPokemonFromPokedexById(id: number): Observable<Pokedex> {
    return this.http.get<Pokedex>(`${this.apiUrl}/${id}`);
  }

}
