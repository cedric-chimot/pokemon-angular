import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShinyAttaques } from '../../models/tables/ShinyAttaques';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShinyAttaquesService {
 
  private apiUrl = 'http://localhost:8080/api/shinyAttaques';

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau association
  createShinyAttaque(shinyAttaque: ShinyAttaques): Observable<ShinyAttaques> {
    return this.http.post<ShinyAttaques>(`${this.apiUrl}/create`, shinyAttaque);
  }

  // Récupère toutes les associations.
  getAllShinyAttaques(): Observable<ShinyAttaques[]> {
    return this.http.get<ShinyAttaques[]>(`${this.apiUrl}/all`);
  }

  // Trouver une association par son ID
  getShinyAttaqueById(id: number): Observable<ShinyAttaques> {
    return this.http.get<ShinyAttaques>(`${this.apiUrl}/${id}`);
  }

  // Trouver les attaques liées à un shiny donnée
  getAttaquesByShinyId(shinyId: number): Observable<ShinyAttaques[]> {
    return this.http.get<ShinyAttaques[]>(`${this.apiUrl}/shiny/${shinyId}`);
  }

  // Mettre à jour une association
  updateShinyAttaque(shinyAttaque: ShinyAttaques): Observable<ShinyAttaques> {
    return this.http.put<ShinyAttaques>(`${this.apiUrl}/update`, shinyAttaque);
  }
  
  // Supprimer une association par son ID
  deleteShinyAttaqueById(id: number): Observable<ShinyAttaques> {
    return this.http.delete<ShinyAttaques>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les associations
  deleteAllShinyAttaques(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }
  
}
