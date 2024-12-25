import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoiteShiny } from '../../../models/tables/BoiteShiny';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoiteSwitcherComponent } from "../../commons/boite-switcher/boite-switcher.component";
import { BoiteShinyService } from '../../../services/boites-shiny/boite-shiny.service';

@Component({
  selector: 'app-boite-shiny',
  imports: [CommonModule, RouterModule, BoiteSwitcherComponent],
  templateUrl: './boite-shiny.component.html',
  styleUrls: ['./boite-shiny.component.css']
})
export class BoiteShinyComponent implements OnInit  {
  pokemonList: BoiteShiny[] = [];
  currentBoite: string = 'SHINY FAVORIS';
  boites = [
    { id: 1, nom: 'SHINY FAVORIS' },
    { id: 2, nom: 'SHINY STRATS' },
    { id: 3, nom: 'SHINY STRATS 2' },
    { id: 4, nom: 'SHINY ALOLA' },
    { id: 5, nom: 'SHINY GALAR' },
    { id: 6, nom: 'SHINY PALDEA' },
    { id: 7, nom: 'SHINY LEGENDAIRES' },
    { id: 8, nom: 'SHINY LEGENDAIRES ET AUTRES' }
  ];

  @Output() boiteChange = new EventEmitter<number>();

  typeColors: { [key: string]: string } = {
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
  // Mapping des attaques et de leur type
  attaqueTypes: { [key: string]: string } = {
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

  constructor(private boiteShinyService: BoiteShinyService) { }

  ngOnInit(): void {
      this.loadBoiteShiny(this.currentBoite);
  }

  // Méthode pour charger la liste des Pokémon d'une boîte spécifique
  loadBoiteShiny(boite: string) {
    // Vérifie si la boîte est valide avant d'effectuer la requête
    if (!boite || typeof boite !== 'string') {
      console.error('Le nom de la boîte est invalide');
      return;
    }
  
    this.boiteShinyService.getBoitesShiny(boite)
      .subscribe({
        next: (data) => {
          if (data && Array.isArray(data)) {
            // Assure-toi que la réponse est un tableau valide de Pokémon
            this.pokemonList = data;
            console.log('Chargement des Pokémon de la boîte effectué avec succès');
          } else {
            console.warn('Aucun Pokémon trouvé pour cette boîte');
            this.pokemonList = [];  // Ou une valeur par défaut si besoin
          }
        },
        error: (error) => {
          console.error('Erreur lors du chargement des Pokémon de la boîte :', error);
          if (error.error) {
            console.error('Détails de l\'erreur :', error.error);
          }
          // On peut gérer des erreurs de réseau, par exemple, ici
          if (error.status === 0) {
            console.error('Problème de connexion réseau');
          }
        }
      });
  }
  
  // Méthode pour changer de boîte
  switchBoite(boite: string): void {
    // Vérifie si la valeur de 'boite' est valide avant de l'affecter à 'currentBoite'
    if (boite && typeof boite === 'string') {
      this.currentBoite = boite;
      this.loadBoiteShiny(boite);
    } else {
      console.error('La valeur de "boite" n\'est pas valide');
    }
  }
  
   // Fonction pour obtenir la couleur d'un type
   getTypeColor(type: string): string {
    return this.typeColors[type] || '#000000'; 
  }
  
  // Fonction pour récupérer le type d'une attaque
  getAttackType(attaque: string): string {
    return this.attaqueTypes[attaque] || 'Normal'; 

  }

  getSexeSymbol(sexe: string): string {
    switch (sexe) {
      case 'Mâle ♂':
        return '♂';
      case 'Femelle ♀':
        return '♀';
      case 'Assexué Ø':
        return 'Ø';
      default:
        return ''; 
    }
  }
  
  getSexeColor(sexe: string): string {
    switch (sexe) {
      case 'Mâle ♂':
        return '#87ceeb';
      case 'Femelle ♀':
        return '#dda0dd';
      case 'Assexué Ø':
        return '#6a5acd';
      default:
        return '#000000';
    }
  }

}
