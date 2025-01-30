import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShinyAttaques } from '../../models/tables/ShinyAttaques';
import { Observable } from 'rxjs';
import { Attaques } from '../../models/tables/Attaques';

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

  // Récupérer une attaque spécifique d'un Pokémon par position
  getAttaqueByPokemonIdAndPosition(pokemonShinyId: number, position: number): Observable<ShinyAttaques> {
    return this.http.get<ShinyAttaques>(`${this.apiUrl}/pokemon/${pokemonShinyId}/position/${position}`);
  }

  // Mettre à jour un shiny attaque (objet entier)
  updateShinyAttaque(shinyAttaque: ShinyAttaques): Observable<ShinyAttaques> {
    return this.http.patch<ShinyAttaques>(`${this.apiUrl}/update`, shinyAttaque);
  }

  // Mettre à jour uniquement l'attaque associée à un shiny pour une position donnée
  updateShinyAttaqueOnly(pokemonShinyId: number, position: number, nouvelleAttaque: Attaques): Observable<ShinyAttaques> {
    // Vérifie que les données envoyées sont au bon format
    console.log('Données envoyées pour mise à jour:', nouvelleAttaque);
    return this.http.patch<ShinyAttaques>(
      `${this.apiUrl}/update/shiny-attaques/${pokemonShinyId}/position/${position}`,
      nouvelleAttaque
    );
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
