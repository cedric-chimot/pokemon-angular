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

  // Récupère tous les types
  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.apiUrl}/all`);
  }
  
  // Trouver un type par son ID
  getTypeById(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/${id}`);
  }
  
}
