import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dresseur } from '../../models/tables/Dresseur';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DresseursService {
  private apiUrl = 'http://localhost:8080/api/dresseurs';

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau dresseur
  createDresseur(dresseur: Dresseur): Observable<Dresseur> {
    return this.http.post<Dresseur>(`${this.apiUrl}/create`, dresseur);
  }
    
  // Récupère tous les dresseurs (réduits)
  getAllDresseurs(): Observable<Dresseur[]> {
    return this.http.get<Dresseur[]>(`${this.apiUrl}/all`);
  }

  // Récupère tous les dresseurs de la région 1 (Ids 1 à 40)
  getAllDresseursRegion1Part1(): Observable<Dresseur[]> {
    return this.http.get<Dresseur[]>(`${this.apiUrl}/all/region1Part1`);
  }

  // Récupère tous les dresseurs de la région 1 (Ids 41 à 81)
  getAllDresseursRegion1Part2(): Observable<Dresseur[]> {
    return this.http.get<Dresseur[]>(`${this.apiUrl}/all/region1Part2`);
  }

  // Récupère tous les dresseurs de la région 2
  getAllDresseursRegion2(): Observable<Dresseur[]> {
    return this.http.get<Dresseur[]>(`${this.apiUrl}/all/region2`);
  }

  // Récupère tous les dresseurs de la région 3
  getAllDresseursRegion3(): Observable<Dresseur[]> {
    return this.http.get<Dresseur[]>(`${this.apiUrl}/all/region3`);
  }

  // Récupère un dresseur par son id (complet)
  getDresseurById(id: number): Observable<Dresseur> {
    return this.http.get<Dresseur>(`${this.apiUrl}/find/${id}`);
  }

  // Récupère le nombre total de dresseurs
  getNbDresseurs(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // Mettre à jour un dresseur
  updateDresseur(dresseur: Dresseur): Observable<Dresseur> {
    return this.http.patch<Dresseur>(`${this.apiUrl}/update`, dresseur);
  }
  
  // Supprimer un dresseur par son ID
  deleteDresseurById(id: number): Observable<Dresseur> {
    return this.http.delete<Dresseur>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les dresseurs
  deleteAllDresseurs(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }
  
}
