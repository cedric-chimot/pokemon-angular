import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private readonly typeColors: { [key: string]: string } = {
    Acier: '#5A9190',
    Combat: '#FF6600',
    Dragon: '#0000CC',
    Eau: '#0099FF',
    Electrik: '#FFE200',
    Fée: '#FF66FF',
    Feu: '#FF0000',
    Glace: '#93EAFF',
    Insecte: '#99CC00',
    Normal: '#BFBFBF',
    Plante: '#00CC00',
    Poison: '#993A99',
    Psy: '#FF0066',
    Roche: '#C89058',
    Sol: '#993300',
    Spectre: '#993366',
    Ténèbres: '#4D4D4D',
    Vol: '#6699FF',
  };

  private readonly pokeballColors: { [key: string]: string } = {
    'PokéBall': '#FE1B00', 
    'SuperBall': '#0080FF', 
    'HyperBall': '#E7BC0D', 
    'BisBall': '#ED7F10',  
    'ChronoBall': '#FFFFFF',
    'FaibloBall': '#737B24',
    'FiletBall': '#C71585',
    'HonorBall': '#DC143C', 
    'LuxeBall': '#FFD700',  
    'MémoireBall': '#40E0D0',
    'RapideBall': '#FF4500', 
    'SafariBall': '#228B22', 
    'ScubaBall': '#77B5FE',  
    'SoinBall': '#FF1493',   
    'SombreBall': '#000000',
    'SpeedBall': '#F4A300', 
    'MasseBall': '#8B4513',  
    'AppâtBall': '#FFD700',  
    'LuneBall': '#C0C0C0',   
    'LoveBall': '#FF1493',   
    'CopainBall': '#FF8C00', 
    'RêveBall': '#A9A9A9',   
    'UltraBall': '#FFD700',  
    'MasterBall': '#800080', 
  };

  private readonly sexeColors: { [key: string]: string } = {
    'Mâle ♂': '#87ceeb',
    'Femelle ♀': '#dda0dd',
    'Assexué Ø': '#6a5acd',
  }; 

  private readonly natureColors: { [key: string]: string } = {
    'Brave': '#FF33CC',
    'Discret': '#FF7C80',
    'Doux': '#e3c035',
    'Foufou': '#e94152',
    'Jovial': '#6a5acd',
    'Modeste': '#5A9190',
    'Pressé': '#32cda1',
    'Prudent': '#CCCC00',
    'Relax': '#9999FF',
    'Rigide': '#87ceeb',
    'Timide': '#065cfb',
    'Bizarre': '#808000',
    'Calme': '#008080',
    'Gentil': '#FF5050',
    'Hardi': '#FF9933',
    'Lâche': '#FF7C80',
    'Malpoli': '#CCCC00',
    'Mauvais': '#996600',
    'Naïf': '#666699',
    'Pudique': '#CC0066',
    'Sérieux': '#CC3300',
  };

  constructor() { }

  // Méthodes pour obtenir les couleurs par type, Pokéball et sexe
  getTypeColor(type: string): string {
    return this.typeColors[type] || '#000000';
  }

  getPokeballColor(ball: string): string {
    return this.pokeballColors[ball] || '#000000';
  }

  getSexeColor(sexe: string): string {
    return this.sexeColors[sexe] || '#000000';
  }

  getNatureColor(nature: string): string {
    return this.natureColors[nature] || '#000000';
  }
  
}
