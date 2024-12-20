import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoiteShiny } from '../models/BoiteShiny';

@Injectable({
  providedIn: 'root'
})
export class BoiteShinyService {
  
  private apiUrl = 'http://localhost:8080/api/pokemonShiny';

  constructor(private http: HttpClient) { }

  getBoitesShiny(boite: string) {
    return this.http.get<BoiteShiny[]>(`${this.apiUrl}/boites?boite=${boite}`);
  }
}
