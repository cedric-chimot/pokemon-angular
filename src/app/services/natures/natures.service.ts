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

  // Ajouter une nouvelle nature
  createNature(nature: Nature): Observable<Nature> {
    return this.http.post<Nature>(`${this.apiUrl}/create`, nature);
  }
    
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
  
  // Mettre à jour une nature
  updateNature(nature: Nature): Observable<Nature> {
    return this.http.patch<Nature>(`${this.apiUrl}/update`, nature);
  }
  
  // Supprimer une nature par son ID
  deleteNatureById(id: number): Observable<Nature> {
    return this.http.delete<Nature>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les natures
  deleteAllNatures(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }
    
}
