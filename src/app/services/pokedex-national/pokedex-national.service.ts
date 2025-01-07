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

  // Récupère les données des pokémons du pokedex national par région.
  getPokemonsByRegion(regionId: number): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/region/${regionId}`);
  }
  
  // Récupère les données d'un pokémon du pokedex national par son Id.
  getPokemonFromPokedexById(id: number): Observable<PokedexNational> {
    return this.http.get<PokedexNational>(`${this.apiUrl}/${id}`);
  }

}
