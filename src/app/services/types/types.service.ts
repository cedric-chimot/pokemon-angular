import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../../models/tables/Type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  private apiUrl = 'http://localhost:8080/api/types';

  constructor(private http: HttpClient) { }

  // Ajouter une nouvelle nature
  createType(type: Type): Observable<Type> {
    return this.http.post<Type>(`${this.apiUrl}/create`, type);
  }

  // Récupère tous les types
  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.apiUrl}/all`);
  }

  // Trouver un type par son ID
  getTypeById(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un type
  updateType(type: Type): Observable<Type> {
    return this.http.patch<Type>(`${this.apiUrl}/update`, type);
  }

  // Supprimer un type par son ID
  deleteTypeById(id: number): Observable<Type> {
    return this.http.delete<Type>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer tous les types
  deleteAllTypes(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
