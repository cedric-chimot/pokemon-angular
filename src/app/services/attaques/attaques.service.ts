import { Injectable } from '@angular/core';
import { ColorsService } from '../colors/colors.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  // Mapping des attaques et de leur type
  private readonly attaqueTypes: { [key: string]: string } = {
    'Psykoud\'Boul': 'Psy',
    'Séisme': 'Sol',
    'Poing Glace': 'Glace',
    'Poing Météore': 'Acier',
    'Vibrobscur': 'Ténèbres',
    'Surf': 'Eau',
    'Détricanon': 'Poison',
    'Laser Glace': 'Glace',
    'Ombre Portée': 'Spectre',
    'Tête de Fer': 'Acier',
    'Danse Lames': 'Normal',
    'Damoclès': 'Normal',
    'Bouclier Royal': 'Spectre',
    'Vampi-Poing': 'Combat',
    'Close Combat': 'Combat',
    'Colère': 'Dragon',
    'Draco-Griffe': 'Dragon',
    'Luminocanon': 'Acier',
    'Fulgurayon': 'Electrik',
    'Lance-Soleil': 'Plante',
    'Draco-Météore': 'Dragon',
    'Boutefeu': 'Feu',
    'Vitesse Extrême': 'Normal',
    'Lame de Roc': 'Roche',
    'Mâchouille': 'Ténèbres',
    'Canon Graine': 'Plante',
    'Mach Punch': 'Combat',
    'Poing Feu': 'Feu',
    'Poing Éclair': 'Electrik',
    'Éco-Sphère': 'Plante',
    'Exploforce': 'Combat',
    'Draco-Choc': 'Dragon',
    'Tempête Verte': 'Plante',
    'Pied Brûleur': 'Feu',
    'Telluriforce': 'Sol',
    'Lance-Flammes': 'Feu',
    'Ball\'Ombre': 'Spectre',
    'Psyko': 'Psy',
    'Choc Psy': 'Psy',
    'Éclat Magique': 'Fée',
    'Danse Draco': 'Dragon',
    'Blizzard': 'Glace',
    'Mégacorne': 'Insecte',
    'Tricherie': 'Ténèbres',
    'Abri': 'Normal',
    'Toxik': 'Poison',
    'Cent Rancunes': 'Ténèbres',
    'Plaie-Croix': 'Insecte',
    'Lame-Feuille': 'Plante',
    'Voile Miroir': 'Psy',
    'Mégaphone': 'Normal',
    'Tonnerre': 'Electrik',
    'Coup d\'Jus': 'Electrik',
    'Change Éclair': 'Electrik',
    'Queue de Fer': 'Acier',
    'Hydrocanon': 'Eau',
    'Pisto-Poing': 'Acier',
    'Déflagration': 'Feu',
    'Flying Press': 'Combat',
    'Piqué': 'Vol',
    'Ébullition': 'Eau',
    'Atterrissage': 'Vol',
    'Demi-Tour': 'Insecte',
    'Surpuissance': 'Combat',
    'Pouvoir Lunaire': 'Fée',
    'Génusection': 'Ténèbres',
    'Direct Toxik': 'Poison',
    'Coup Bas': 'Ténèbres',
    'Coupe Psycho': 'Psy',
    'Bomb Beurk': 'Poison',
    'Danse Fleurs': 'Plante',
    'Giga-Sangsue': 'Plante',
    'Fracass\'Tête': 'Roche',
    'Lyophilisation': 'Glace',
    'Pouvoir Antique': 'Roche',
    'Cascade': 'Eau',
    'Ailes Psycho': 'Psy',
    'Lame d\'Air': 'Vol',
    'Vent Arrière': 'Vol',
    'Vent Violent': 'Vol',
    'Boule Élek': 'Electrik',
    'Nœud Herbe': 'Plante',
    'Cradovague': 'Poison',
    'Piège de Roc': 'Roche',
    'Câlinerie': 'Fée',
    'Dynamo-Poing': 'Combat',
    'Tacle Lourd': 'Acier',
    'Mur Fumigène': 'Acier',
    'Poison-Croix': 'Poison',
    'Rapace': 'Vol',
    'Anti-Brume': 'Vol',
    'Crocs Givre': 'Glace',
    'Gyroballe': 'Acier',
    'Bluff': 'Normal',
    'Assaut Frontal': 'Sol',
    'Tranche': 'Normal',
    'Cavalerie Lourde': 'Sol',
    'Taurogne': 'Normal',
    'Éboulement': 'Roche',
    'Canicule': 'Feu',
    'Ultralaser': 'Normal',
    'Éruption': 'Feu',
    'Hydro-Queue': 'Eau',
    'Psycho-Croc': 'Psy',
    'Bang Sonique': 'Normal',
    'Crocs Éclair': 'Electrik',
    'Éclair Fou': 'Electrik',
    'Crocs Feu': 'Feu',
    'Aurasphère': 'Combat',
    'Picôts': 'Sol',
    'Bec Vrille': 'Vol',
    'Pied Voltige': 'Combat',
    'Éclats Glace': 'Glace',
    'Exuviation': 'Normal',
    'Chute Glace': 'Glace',
    'Aqua-Brèche': 'Eau',
    'Explonuit': 'Ténèbres' ,
    'Vibrécaille': 'Dragon',
    'Griffe Ombre': 'Spectre',
    'Tisse Ombre': 'Spectre',
    'Dark Lariat': 'Ténèbres',
    'Vampirisme': 'Insecte',
    'Aria de l\'Écume': 'Eau',
    'Vif Roc': 'Roche',
    'Casse-Brique': 'Combat',
    'Tunnelier': 'Sol',
    'Blockhaus': 'Poison',
    'Soin': 'Normal',
    'Pics Toxik': 'Poison',
    'Bourdon': 'Insecte',
    'Mégafouet': 'Plante',
    'Ancrage': 'Acier',
    'Aqua-Jet': 'Eau',
    'Escarmouche': 'Insecte',
    'Carapiège': 'Feu',
    'Giga Impact': 'Normal',
    'Marto-Poing': 'Combat',
    'Amass\'sable': 'Sol',
    'Extrasenseur': 'Psy',
    'Bec-Canon': 'Vol',
    'Marteau de Glace': 'Glace',
    'Électrikipik': 'Electrik',
    'Pico-Défense': 'Plante',
    'Botte Sucrette': 'Plante',
    'Acrobatie': 'Vol',
    'Os\'Ombre': 'Spectre',
    'Amass\'able': 'Sol',
    'Sabotage': 'Ténèbres',
    'Tambour Battant': 'Plante',
    'Ballon Brûlant': 'Feu',
    'Hantise': 'Spectre',
    'Draco-Flèches': 'Dragon',
    'Enroulement': 'Poison',
    'Fouet de Feu': 'Feu',
    'Overdrive': 'Electrik',
    'Tacle Feu': 'Feu',
    'Ultime Bastion': 'Combat',
    'Big Splash': 'Combat',
    'Choc Émotionnel': 'Fée',
    'Force G': 'Plante',
    'Acide Malique': 'Plante',
    'Feu Encorcelé': 'Feu',
    'Plénitude': 'Psy',
    'Papillodanse': 'Insecte',
    'Roue Libre': 'Electrik',
    'Regard Médusant': 'Normal',
    'Exécu-Son': 'Ténèbres',
    'Façade': 'Normal',
    'Blocage': 'Ténèbres',
    'Machination': 'Ténèbres',
    'Clonage': 'Normal',
    'Kokiyarme': 'Poison',
    'Sort Sinistre': 'Psy',
    'Tir de Précision': 'Eau',
    'Charge Glaive': 'Dragon',
    'Ruée d\'Or': 'Acier',
    'Canon Blindé': 'Feu',
    'Lame Solaire': 'Plante',
    'Tranche-Nuit': 'Ténèbres',
    'Lame en Peine': 'Feu',
    'Souplesse': 'Normal',
    'Marteau Mastoc': 'Acier',
    'Laser Hasard': 'Dragon',
    'Cri Draconique': 'Dragon',
    'Chant Flamboyant': 'Feu',
    'Aquatacle': 'Eau',
    'Queulonage': 'Normal',
    'Draco-Charge': 'Dragon',
    'Poing Ombre': 'Spectre',
    'Poing de Colère': 'Spectre',
    'Plaquage': 'Normal',
    'Plat du Jour': 'Dragon',
    'Dérapage': 'Acier',
    'Eau Revoir': 'Eau',
    'Poing Sonique': 'Eau',
    'Rayon Gemme': 'Roche',
    'Tomberoche': 'Roche',
    'Rebond': 'Vol',
    'Cryo-Pirouette': 'Glace',
    'Tunnel': 'Sol',
    'Surchauffe': 'Feu',
    'Double Décharge': 'Electrik',
    'Salaison': 'Roche',
    'Hommage Posthume': 'Spectre',
    'Draco-Ascension': 'Vol',
    'Lame Pangéenne': 'Sol',
    'Fatal-Foudre': 'Electrik',
    'Onde Originelle': 'Eau',
    'Choc Météore': 'Acier',
    'Rayon Spectral': 'Spectre',
    'Laser Prisme': 'Psy',
    'Photo-Geyser': 'Psy',
    'Géo-Contrôle': 'Fée',
    'Mort-Ailes': 'Vol',
    'Myria-Flèches': 'Sol',
    'Sanction Suprême': 'Dragon',
    'Hurle-Temps': 'Dragon',
    'Spatio-Rift': 'Dragon',
    'Revenant': 'Spectre',
    'Zénith': 'Feu',
    'Feu Sacré': 'Feu',
    'Aéroblast': 'Vol',
    'Lame Sainte': 'Combat',
    'Garde Large': 'Roche',
    'Mur de Fer': 'Acier',
    'Laser Infinimax': 'Dragon',
    'Canon Dynamax': 'Dragon',
    'Glaciation': 'Glace',
    'Anti-brume': 'Vol',
    'Frappe Psy': 'Psy',
    'Flamme Bleue': 'Feu',
    'Flamme Croix': 'Feu',
    'Éclair Croix': 'Electrik',
    'Charge Foudre': 'Electrik',
    'Écrous d\'Poing': 'Acier',
    'Ultimapoing': 'Normal',
    'Plasma Punch': 'Electrik',
    'Ire de la Nature': 'Fée',
    'Martobois': 'Plante',
    'Encornebois': 'Plante',
    'Brume': 'Glace',
    'Repos': 'Psy',
    'Tour Rapide': 'Normal',
    'Voltageôle': 'Electrik',
    'Draco-Énergie': 'Dragon',
    'Vortex Magma': 'Feu',
    'Vampigraine': 'Plante',
    'Estocorne': 'Acier',
    'Piège de Venin': 'Poison',
    'Caboche-Kaboum': 'Feu'                  
  };

  /**
   * Récupère le type d'une attaque
   * @param attaque - Nom de l'attaque
   * @returns Le type de l'attaque ou 'Inconnu'
   */
  getAttaques(): { [key: string]: string } {
    return this.attaqueTypes;
  }

  /**
   * Récupère la couleur associée au type d'une attaque
   * @param attaque - Nom de l'attaque
   * @returns La couleur du type ou '#000000' par défaut
   */
  getColorForAttaque(attaque: string): string | undefined {
    const type = this.attaqueTypes[attaque];
    return this.colorService.getTypeColor(type);
  }

}
