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

  createPokemonInPokedex(pokemon: PokedexNational): Observable<PokedexNational> {
    return this.http.post<PokedexNational>(`${this.apiUrl}/create`, pokemon);
  }
  
  // Récupère toutes les données des pokémons du pokedex national.
  getAllPokemonsFromPokedex(): Observable<PokedexNational[]> {
    return this.http.get<PokedexNational[]>(`${this.apiUrl}/find/all`);
  }

  // Récupère les données des pokémons du pokedex national par région (pokedex national)
  getPokemonsByRegion(regionId: number): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/region/${regionId}`);
  }

  // Récupère les données des pokémons du pokedex national par région (admin)
  getPokemonsByRegionForAdmin(regionId: number): Observable<PokedexRegions[]> {
    return this.http.get<PokedexRegions[]>(`${this.apiUrl}/region-admin/${regionId}`);
  }
  
  // Récupère les données d'un pokémon du pokedex national par son Id.
  getPokemonFromPokedexById(id: number): Observable<PokedexNational> {
    return this.http.get<PokedexNational>(`${this.apiUrl}/${id}`);
  }

  // Récupère le nombre de pokémons dans le pokedex national.
  getNbPokemonsInPokedex(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
  
  getNbPokemonsByRegions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/count-by-region`);
  }

  updatePokemonInPokedex(pokemon: PokedexNational): Observable<PokedexNational> {
    return this.http.patch<PokedexNational>(`${this.apiUrl}/update`, pokemon);
  }

  // Supprimer un pokémon par son ID
  deletePokemonInPokedexById(id: number): Observable<PokedexNational> {
    return this.http.delete<PokedexNational>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les pokémons
  deleteAllPokemonsFromPokedex(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }
  
}
