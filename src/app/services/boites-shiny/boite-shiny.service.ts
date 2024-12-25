import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoiteShiny } from '../../models/tables/BoiteShiny';
import { Observable } from 'rxjs';
import { StatIvManquant } from '../../models/stats/StatIvManquant';

@Injectable({
  providedIn: 'root'
})
export class BoiteShinyService {
  
  private apiUrl = 'http://localhost:8080/api/pokemonShiny';

  constructor(private http: HttpClient) { }

  // Récupère les données des boîtes de Shiny pour une boîte donnée.
  getBoitesShiny(boite: string) {
    return this.http.get<BoiteShiny[]>(`${this.apiUrl}/boites?boite=${boite}`);
  }

  // Récupère les statistiques IVs manquants pour tous les shiny.
  getStatsIvManquants(): Observable<StatIvManquant[]> {
    return this.http.get<StatIvManquant[]>(`${this.apiUrl}/iv-manquants`);
  }

}
