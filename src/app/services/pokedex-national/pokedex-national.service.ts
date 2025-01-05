import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokedexRegions } from '../../models/tables/Pokedex-Regions';
import { Observable } from 'rxjs/internal/Observable';
import { PokedexNational } from '../../models/tables/PokedexNational';

@Injectable({
  providedIn: 'root'
})
export class PokedexNationalService {
  private apiUrl = 'http://localhost:8080/api/pokedexNational';

  constructor(private http: HttpClient) { }

  // Récupère toutes les données des pokémons du pokedex national.
  getAllPokemonsFromPokedex(): Observable<PokedexNational[]> {
    return this.http.get<PokedexNational[]>(`${this.apiUrl}/find/all`);
  }

  // Méthodes spécifiques pour chaque région
  getAllPokemonsFromKanto(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/kanto`);
  }

  getAllPokemonsFromJohto(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/johto`);
  }

  getAllPokemonsFromHoenn(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/hoenn`);
  }

  getAllPokemonsFromSinnoh(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/sinnoh`);
  }

  getAllPokemonsFromUnys(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/unys`);
  }

  getAllPokemonsFromKalos(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/kalos`);
  }

  getAllPokemonsFromAlola(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/alola`);
  }

  getAllPokemonsFromGalar(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/galar`);
  }

  getAllPokemonsFromHisui(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/hisui`);
  }

  getAllPokemonsFromPaldea(): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/paldea`);
  }
  // Récupère les données d'un pokémon du pokedex national par son Id.
  getPokemonFromPokedexById(id: number): Observable<PokedexNational> {
    return this.http.get<PokedexNational>(`${this.apiUrl}/${id}`);
  }

}
