import { Injectable } from '@angular/core';
import { ColorsService } from '../colors/colors.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Attaques } from '../../models/tables/Attaques';

@Injectable({
  providedIn: 'root'
})
export class AttaquesService {
  private apiUrl = 'http://localhost:8080/api/attaques';

  constructor(private http: HttpClient, private colorService: ColorsService) { }

  // Ajouter une nouvelle attaque
  createAttaque(attaque: Attaques): Observable<Attaques> {
    return this.http.post<Attaques>(`${this.apiUrl}/create`, attaque);
  }

  // Afficher la liste de toutes les attaques
  getAllAttaques(): Observable<Attaques[]> {
    return this.http.get<Attaques[]>(`${this.apiUrl}/all`);
  }

  // Trouver une attaque par son ID
  getAttaqueById(id: number): Observable<Attaques> {
    return this.http.get<Attaques>(`${this.apiUrl}/${id}`);
  }

  // Afficher les attaques pour un type donné
  getAttaquesByType(typeId: number): Observable<Attaques[]> {
    return this.http.get<Attaques[]>(`${this.apiUrl}/type/${typeId}`);
  }
      
  // Récupère le nombre total d'attaques
  getNbAttaques(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  // Récupère le nombre total d'attaques pour chaque types
  getNbAttaquesByType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/count-by-type`);
  }

  // Mettre à jour une attaque
  updateAttaque(attaque: Attaques): Observable<Attaques> {
    return this.http.put<Attaques>(`${this.apiUrl}/update`, attaque);
  }

  // Supprimer une attaque par son ID
  deleteAttaqueById(id: number): Observable<Attaques> {
    return this.http.delete<Attaques>(`${this.apiUrl}/delete/${id}`);
  }

  // Supprimer toutes les attaques
  deleteAllAttaques(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/all`);
  }

  /**
   * Récupère la couleur associée au type d'une attaque
   * @param attaque - Nom de l'attaque
   * @returns La couleur du type ou '#000000' par défaut
   */
  getColorForAttaque(attaque: Attaques): Observable<string | undefined> {
    return this.getAttaqueById(attaque.id).pipe(
      map((attaqueData) => {
        return this.colorService.getTypeColor(attaqueData.typeAttaque.nomType);
      }),
      catchError(() => of('#000000')) // Défaut si l'attaque n'existe pas
    );
  }
  
}
