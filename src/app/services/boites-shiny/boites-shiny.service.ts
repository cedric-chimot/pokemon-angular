import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boite } from '../../models/stats/Boites';

@Injectable({
  providedIn: 'root'
})
export class BoitesShinyService {

private apiUrl = 'http://localhost:8080/api/boites';

  constructor(private http: HttpClient) { }

  // Récupère toutes les boites
  getAllBoites(): Observable<Boite[]> {
    return this.http.get<Boite[]>(`${this.apiUrl}/all`);
  }

  // Récupère une boite par son id
  getBoiteById(id: number): Observable<Boite> {
    return this.http.get<Boite>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère les statistiques globales pour un type donné.
   * @param type Le type de statistique (par exemple 'pokeballs', 'dresseurs', etc.)
   * @returns Observable avec les données des statistiques
   */
  getStatsGlobales(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/global/${type}`);
  }

  // Méthode pour récupérer les statistiques pour une boîte donnée et un type donné.
  getStatsByType(boiteId: number, type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/${type}`);
  }

  // Récupère le nombre de boites shiny
  getNbBoites(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

}
