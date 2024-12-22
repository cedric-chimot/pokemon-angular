import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boite } from '../../models/stats/Boites';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  
private apiUrl = 'http://localhost:8080/api/boites';

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les statistiques pour une boîte spécifiée.
   */
  getAllStats(boiteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/all-stats`);
  }

  // Récupérer les stats Dresseurs
  getDresseursStats(boiteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/dresseurs`);
  }
  
  // Récupérer les stats Natures
  getNaturesStats(boiteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/natures`);
  }
  
  // Récupérer les stats Sexes
  getSexesStats(boiteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/sexes`);
  }
  
  // Récupérer les stats Types
  getTypesStats(boiteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/types`);
  }
  
  // Récupérer les stats Pokeballs
  getPokeballsStats(boiteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/pokeballs`);
  }

}
 