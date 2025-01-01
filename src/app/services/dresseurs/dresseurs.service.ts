import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dresseur } from '../../models/tables/Dresseur';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DresseursService {
  private apiUrl = 'http://localhost:8080/api/dresseurs';

  constructor(private http: HttpClient) { }

  // Récupère tous les dresseurs (complets) sans les Ids exclus
  getAllDresseurs(): Observable<Dresseur[]> {
    return this.http.get<Dresseur[]>(`${this.apiUrl}/find/all`)
  }

  // Récupère tous les dresseurs du Pokedex (numDresseur et nomDresseur)
  getAllDresseursInPokedex(): Observable<Dresseur[]> {
    return this.http.get<Dresseur[]>(`${this.apiUrl}/all`)
  }

  // Récupère un dresseur par son id (complet)
  getDresseurById(id: number): Observable<Dresseur> {
    return this.http.get<Dresseur>(`${this.apiUrl}/find/${id}`)
  }

  // Récupère un dresseur par son id (numDresseur et nomDresseur)
  getDresseurInPokedexById(id: number): Observable<Dresseur> {
    return this.http.get<Dresseur>(`${this.apiUrl}/${id}`)
  }

}
