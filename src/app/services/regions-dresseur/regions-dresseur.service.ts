import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegionDresseur } from '../../models/tables/RegionDresseur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsDresseurService {
  private apiUrl = 'http://localhost:8080/api/regionDresseur';

  constructor(private http: HttpClient) { }
  createRegionDresseur(regionDresseur: RegionDresseur): Observable<RegionDresseur> {
    return this.http.post<RegionDresseur>(`${this.apiUrl}/create`, regionDresseur);
  }
    
  // Récupère toutes les données d'une région dresseur.
  getAllRegionDresseur(): Observable<RegionDresseur[]> {
    return this.http.get<RegionDresseur[]>(`${this.apiUrl}/all`);
  }

  // Récupère le nom d'une région dresseur par son ID.
  getRegionDresseurById(id: number): Observable<RegionDresseur[]> {
    return this.http.get<RegionDresseur[]>(`${this.apiUrl}/find/${id}`);
  }

  // Mettre à jour une région dresseur
  updateRegionDresseur(regionDresseur: RegionDresseur): Observable<RegionDresseur> {
    return this.http.put<RegionDresseur>(`${this.apiUrl}/update`, regionDresseur);
  }
  
  // Supprimer une région dresseur par son ID
  deleteRegionDresseurById(id: number): Observable<RegionDresseur> {
    return this.http.delete<RegionDresseur>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les régions dresseur
  deleteAllRegionDresseur(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }
  
}
