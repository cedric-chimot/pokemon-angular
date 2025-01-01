import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsShinyService {
  
private apiUrl = 'http://localhost:8080/api/boites';

  constructor(private http: HttpClient) { }

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
  
}
 