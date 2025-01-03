import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pokeball } from '../../models/tables/PokeBall';

@Injectable({
  providedIn: 'root'
})
export class PokeballsService {
  private apiUrl = 'http://localhost:8080/api/pokeballs';

  constructor(private http: HttpClient) { }

    // Récupère toutes les pokeballs (complets) 
    getAllPokeballs(): Observable<Pokeball[]> {
      return this.http.get<Pokeball[]>(`${this.apiUrl}/find/all`)
    }
  
    // Récupère toutes les pokeballs du Pokedex (nomPokeball)
    getAllPokeballsInPokedex(): Observable<Pokeball[]> {
      return this.http.get<Pokeball[]>(`${this.apiUrl}/all`)
    }
  
    // Récupère une pokeball par son id (complet)
    getPokeballById(id: number): Observable<Pokeball> {
      return this.http.get<Pokeball>(`${this.apiUrl}/find/${id}`)
    }
  
    // Récupère une pokeball par son id (nomPokeball)
    getPokeballInPokedexById(id: number): Observable<Pokeball> {
      return this.http.get<Pokeball>(`${this.apiUrl}/${id}`)
    }
  
}