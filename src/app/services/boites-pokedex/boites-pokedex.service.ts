import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BoitesPokedex } from '../../models/tables/BoitesPokedex';

@Injectable({
  providedIn: 'root'
})
export class BoitesPokedexService {
  private apiUrl = 'http://localhost:8080/api/boitePokedex';

  constructor(private http: HttpClient) { }

  // Récupère toutes les données des boîtes de Pokédex.
  getAllBoitesPokedex(): Observable<BoitesPokedex[]> {
    return this.http.get<BoitesPokedex[]>(`${this.apiUrl}/all`);
  }

  // Récupère toutes les données d'une boîte du Pokédex.
  getBoiteAllDatas(id: number): Observable<BoitesPokedex[]> {
    return this.http.get<BoitesPokedex[]>(`${this.apiUrl}/find/${id}`);
  }

  // Récupère le nom d'une boîte du Pokédex par son ID.
  getBoitePokedexById(id: number): Observable<BoitesPokedex[]> {
    return this.http.get<BoitesPokedex[]>(`${this.apiUrl}/${id}`);
  }

}
