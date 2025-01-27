import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regions } from '../../models/tables/Regions';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  private apiUrl = 'http://localhost:8080/api/regions';

  constructor(private http: HttpClient) { }
  
  // Ajouter une nouvelle nature
  createRegion(region: Regions): Observable<Regions> {
    return this.http.post<Regions>(`${this.apiUrl}/create`, region);
  }
     
  // Récupère toutes les régions 
  getAllRegions(): Observable<Regions[]> {
    return this.http.get<Regions[]>(`${this.apiUrl}/all`);
  }

  // Récupère une région par son id 
  getRegionById(id: number): Observable<Regions> {
    return this.http.get<Regions>(`${this.apiUrl}/${id}`);
  }
  
  // Récupère le nombre total de régions
  getNbRegions(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // Mettre à jour une région 
  updateRegion(region: Regions): Observable<Regions> {
    return this.http.put<Regions>(`${this.apiUrl}/update`, region);
  }

  // Supprimer une région par son ID
  deleteRegionById(id: number): Observable<Regions> {
    return this.http.delete<Regions>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les régions 
  deleteAllRegion(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
