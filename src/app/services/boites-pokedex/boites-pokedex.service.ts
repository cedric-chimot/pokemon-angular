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

  createBoitePokedex(boite: BoitesPokedex): Observable<BoitesPokedex> {
    return this.http.post<BoitesPokedex>(`${this.apiUrl}/create`, boite);
  }
    
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

  // Mettre à jour une boite pokédex
  updateBoitePokedex(boite: BoitesPokedex): Observable<BoitesPokedex> {
    return this.http.put<BoitesPokedex>(`${this.apiUrl}/update`, boite);
  }
  
  // Supprimer une attaque par son ID
  deleteBoiteById(id: number): Observable<BoitesPokedex> {
    return this.http.delete<BoitesPokedex>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les attaques
  deleteAllBoites(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }
  
}
