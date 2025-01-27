import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sexe } from '../../models/tables/Sexe';

@Injectable({
  providedIn: 'root'
})
export class SexesService {
  private apiUrl = 'http://localhost:8080/api/sexes';

  constructor(private http: HttpClient) { }
  
  // Ajouter un nouveau sexe
  createSexe(sexe: Sexe): Observable<Sexe> {
    return this.http.post<Sexe>(`${this.apiUrl}/create`, sexe);
  }

  // Afficher la liste de tous les sexes
  getAllSexes(): Observable<Sexe[]> {
    return this.http.get<Sexe[]>(`${this.apiUrl}/find/all`);
  }

  // Trouver un sexe par son ID
  getSexeById(id: number): Observable<Sexe> {
    return this.http.get<Sexe>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un sexe
  updateSexe(sexe: Sexe): Observable<Sexe> {
    return this.http.patch<Sexe>(`${this.apiUrl}/update`, sexe);
  }

  // Supprimer un sexe par son ID
  deleteSexeById(id: number): Observable<Sexe> {
    return this.http.delete<Sexe>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les sexes
  deleteAllSexes(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }
  
}
