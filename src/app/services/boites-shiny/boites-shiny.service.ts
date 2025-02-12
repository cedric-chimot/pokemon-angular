import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boites } from '../../models/stats/Boites';

@Injectable({
  providedIn: 'root'
})
export class BoitesShinyService {

private apiUrl = 'http://localhost:8080/api/boites';

  constructor(private http: HttpClient) { }

  // Ajouter une nouvelle boite
  createBoite(boite: Boites): Observable<Boites> {
    return this.http.post<Boites>(`${this.apiUrl}/create`, boite);
  }

  // Récupère toutes les boites
  getAllBoites(): Observable<Boites[]> {
    return this.http.get<Boites[]>(`${this.apiUrl}/all`);
  }

  // Récupère une boite par son id
  getBoiteById(id: number): Observable<Boites> {
    return this.http.get<Boites>(`${this.apiUrl}/${id}`);
  }

  // Récupère les statistiques globales pour un type donné.
  getStatsGlobales(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/global/${type}`);
  }

  // Méthode pour récupérer les statistiques pour une boîte donnée et un type donné.
  getStatsByType(boiteId: number, type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${boiteId}/${type}`);
  }

  // Récupère le nombre de boites shiny
  getNbBoites(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // Mettre à jour une boite
  updateBoite(boite: Boites): Observable<Boites> {
    return this.http.patch<Boites>(`${this.apiUrl}/update`, boite);
  }

  // Supprimer une boite par son ID
  deleteBoiteById(id: number): Observable<Boites> {
    return this.http.delete<Boites>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les boites
  deleteAllBoites(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

}
