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

  // Ajouter une nouvelle pokeball
  createPokeball(pokeball: Pokeball): Observable<Pokeball> {
    return this.http.post<Pokeball>(`${this.apiUrl}/create`, pokeball);
  }
    
  // Récupère toutes les pokeballs pour les stats Pokedex 
  getAllPokeballsForPokedex(): Observable<Pokeball[]> {
    return this.http.get<Pokeball[]>(`${this.apiUrl}/all/pokedex`)
  }

  // Récupère toutes les pokeballs pour la partie Administration
  getAllPokeballsForAdmin(): Observable<Pokeball[]> {
    return this.http.get<Pokeball[]>(`${this.apiUrl}/all/admin`)
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

  // Mettre à jour une pokeball
  updatePokeball(pokeball: Pokeball): Observable<Pokeball> {
    return this.http.patch<Pokeball>(`${this.apiUrl}/update`, pokeball);
  }
  
  // Supprimer une pokeball par son ID
  deletePokeballById(id: number): Observable<Pokeball> {
    return this.http.delete<Pokeball>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les pokeballs
  deleteAllPokeballs(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
