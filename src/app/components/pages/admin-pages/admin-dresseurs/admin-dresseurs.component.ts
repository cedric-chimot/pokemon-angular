import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../commons/pagination/pagination/pagination.component';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { RegionsDresseurService } from '../../../../services/regions-dresseur/regions-dresseur.service';
import { RegionDresseur } from '../../../../models/tables/RegionDresseur';
import { Dresseur } from '../../../../models/tables/Dresseur';

@Component({
  selector: 'app-admin-dresseurs',
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './admin-dresseurs.component.html',
  styleUrls: ['./admin-dresseurs.component.css']
})
export class AdminDresseursComponent {
  regionDresseur: string[] = []; 
  allDresseursList: Dresseur[] = [];
  dresseursList: Dresseur[] = [];
  currentPage: number = 1; 
  dresseursPerPage: number = 8; 
  idRegionDresseur: number = 1; 
  regionDresseurSelected: string = ''; 
  selectedDresseur: Dresseur | null = null;
  isModalOpen = false;
  regionsDresseur: RegionDresseur[] = [];

  constructor(
    private dresseurService: DresseursService,
    private regionDresseurService: RegionsDresseurService,
  ) {}

  ngOnInit(): void {
    this.getRegionDresseur();
    this.getDresseurs(); // Charge les dresseurs pour la région initiale
  }

  // Récupère la liste des régions dresseur
  getRegionDresseur(): void {
    this.regionDresseurService.getAllRegionDresseur().subscribe({
      next: (regionDresseur: RegionDresseur[]) => {
        this.regionsDresseur = regionDresseur; // Stocke les régions
      },
      error: (error: any) => console.error('Erreur lors du chargement des régions dresseur:', error),
    });
  }

  // Récupère les dresseurs en fonction de la région sélectionnée
  getDresseurs(): void {
    this.currentPage = 1;
    if (this.idRegionDresseur === 1) {
      // Charger la première partie
      this.dresseurService.getAllDresseursRegion1().subscribe({
        next: (dresseurs: Dresseur[]) => this.handleDresseursResponse(dresseurs),
        error: (error: any) => console.error('Erreur lors du chargement des dresseurs de la région 1:', error),
      })
    } else if (this.idRegionDresseur === 2) {
      this.dresseurService.getAllDresseursRegion2().subscribe({
        next: (dresseurs: Dresseur[]) => this.handleDresseursResponse(dresseurs),
        error: (error: any) => console.error('Erreur lors du chargement des dresseurs de la région 2:', error),
      });
    } else if (this.idRegionDresseur === 3) {
      this.dresseurService.getAllDresseursRegion3().subscribe({
        next: (dresseurs: Dresseur[]) => this.handleDresseursResponse(dresseurs),
        error: (error: any) => console.error('Erreur lors du chargement des dresseurs de la région 3:', error),
      });
    }
  }
  
  // Gère la réponse après récupération des dresseurs
  handleDresseursResponse(dresseurs: Dresseur[]): void {
    this.allDresseursList = dresseurs; // Stocke tous les dresseurs récupérés
    this.updatePage(); // Met à jour la pagination
  }

  // Mise à jour de la pagination
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.dresseursPerPage;
    const endIndex = startIndex + this.dresseursPerPage;
    this.dresseursList = this.allDresseursList.slice(startIndex, endIndex);
  }

  // Changement de région
  changeRegion(regionId: number): void {
    this.idRegionDresseur = regionId;
    this.currentPage = 1;
    this.getDresseurs(); // Charge les dresseurs de la nouvelle région
  }

  // Génération des numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allDresseursList.length / this.dresseursPerPage) }, (_, i) => i + 1);
  }

  // Navigation entre les pages
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les dresseurs affichés
  }

  // Ouvrir le modal pour la modification d'un dresseur
  openDresseurModal(dresseur: Dresseur): void {
    // Copie sécurisée de l'attaque sélectionnée
    this.selectedDresseur = { ...dresseur };
  
    // Vérifie si une région est liée au dresseur
    if (this.selectedDresseur.regionDresseur && this.selectedDresseur.regionDresseur.idRegionDresseur) {
      this.selectedDresseur.regionDresseur = this.selectedDresseur.regionDresseur; 
      this.isModalOpen = true; // Ouvrir le modal après avoir récupéré la région dresseur
    } else {
      console.error('Région invalide ou non définie pour ce dresseur');
      this.selectedDresseur.regionDresseur = this.regionsDresseur[0]; // Si 'regionDresseur' contient des données
      this.isModalOpen = true;
    }
  }
    
  // Mettre à jour le dresseur
  updateDresseur(): void {
    if (this.selectedDresseur && this.selectedDresseur.regionDresseur) {
      const updatedDresseur = {
        id: this.selectedDresseur.id,
        numDresseur: this.selectedDresseur.numDresseur,
        nomDresseur: this.selectedDresseur.nomDresseur,
        nbPokemon: this.selectedDresseur.nbPokemon,
        nbShiny: this.selectedDresseur.nbShiny,
        regionDresseur: this.selectedDresseur.regionDresseur, 
      };
      
      this.dresseurService.updateDresseur(updatedDresseur as any).subscribe({
        next: () => {
          this.getDresseurs();
          this.closeModal();
        },
        error: (err) => alert('Erreur lors de la mise à jour :' + err),
      });
    }
  }
    
  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDresseur = null;
  }

  // Met à jour idRegionDresseur et recharge les données
  changeRegionDresseur(regionId: number): void {
    this.idRegionDresseur = regionId;
    this.getDresseurs();
  }

  // Récupère le nom de la région dresseur par son ID
  getRegionDresseurById(regionId: number): string {
    const regionNames: { [id: number]: string } = {
      1: 'Kanto',
      2: 'Alola/Galar/Hisui',
      3: 'Paldea',
    };
    return regionNames[regionId] || 'Unknown Region';
  }

  // Supprimer un pokémon par son ID
  deleteDresseur(id: number): void {
    this.dresseurService.deleteDresseurById(id).subscribe({
      next: () => {
        this.getDresseurs();  
      },
      error: (err) => console.error('Erreur lors de la suppression du dresseur', err)
    });
  }
  
}
