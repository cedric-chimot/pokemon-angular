import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nature } from '../../models/tables/Nature';

@Injectable({
  providedIn: 'root'
})
export class NaturesService {
private apiUrl = 'http://localhost:8080/api/natures';

  constructor(private http: HttpClient) { }

    // Récupère toutes les natures (complets) 
    getAllNatures(): Observable<Nature[]> {
      return this.http.get<Nature[]>(`${this.apiUrl}/find/all`)
    }
  
    // Récupère toutes les natures du Pokedex (nomNature)
    getAllNaturesInPokedex(): Observable<Nature[]> {
      return this.http.get<Nature[]>(`${this.apiUrl}/all`)
    }
  
    // Récupère une nature par son id (complet)
    getNatureById(id: number): Observable<Nature> {
      return this.http.get<Nature>(`${this.apiUrl}/find/${id}`)
    }
  
    // Récupère une nature par son id (nomNature)
    getNatureInPokedexById(id: number): Observable<Nature> {
      return this.http.get<Nature>(`${this.apiUrl}/${id}`)
    }
  
}
