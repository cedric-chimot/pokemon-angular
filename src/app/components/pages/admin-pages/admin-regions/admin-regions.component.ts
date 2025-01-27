import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../commons/pagination/pagination/pagination.component';
import { Regions } from '../../../../models/tables/Regions';
import { RegionDresseur } from '../../../../models/tables/RegionDresseur';
import { RegionsDresseurService } from '../../../../services/regions-dresseur/regions-dresseur.service';
import { RegionsService } from '../../../../services/regions/regions.service';

@Component({
  selector: 'app-admin-regions',
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './admin-regions.component.html',
  styleUrls: ['./admin-regions.component.css']
})
export class AdminRegionsComponent {
  allRegionsList: any[] = [];
  regionsList: any[] = [];
  regions: Regions[] = [];
  regionsDresseur: RegionDresseur[] = [];
  regionsPerPage = 6;
  currentPage = 1;

  // Gestion des vues
  showRegions = true; // Détermine la vue active
  showRegionsDresseur = true; 
  isModalOpen = false; // Contrôle l'ouverture du modal

  // Objets pour les formulaires
  region: Partial<Regions> = { id: 0, nomRegion: '' };
  regionDresseur: Partial<RegionDresseur> = { idRegionDresseur: 0, nomRegionDresseur: '' };

  constructor(
    private regionService: RegionsService,
    private regionDresseurService: RegionsDresseurService
  ) {}

  ngOnInit(): void {
    this.showRegion(); 
    this.getRegions(); 
    this.getRegionsDresseur();
  }

  // Récupérer les données des régions
  getRegions(): void {
    this.regionService.getAllRegions().subscribe({
        next: (regions) => {
            this.regions = regions;
            if (this.showRegions) {
                this.allRegionsList = regions; // Met à jour la liste complète
                this.updatePage(); // Met à jour les données visibles
            }
        },
        error: (error) => console.error('Erreur lors du chargement des régions:', error),
    });
  }

  // Récupérer les données des régions dresseurs
  getRegionsDresseur(): void {
    this.regionDresseurService.getAllRegionDresseur().subscribe({
        next: (regionsDresseur) => {
            this.regionsDresseur = regionsDresseur;
            if (this.showRegionsDresseur) {
                this.allRegionsList = regionsDresseur; // Met à jour la liste complète
                this.updatePage(); // Met à jour les données visibles
            }
        },
        error: (error) => console.error('Erreur lors du chargement des régions dresseurs:', error),
    });
  }

  // Méthode pour afficher les régions
  showRegion(): void {
    this.showRegions = true;
    this.showRegionsDresseur = false;
    this.allRegionsList = this.regions; // Met à jour la liste complète
    this.updatePage(); // Met à jour les données visibles
    this.currentPage = 1;
  }

  // Méthode pour afficher les régions dresseurs
  showRegionDresseur(): void {
    this.showRegions = false;
    this.showRegionsDresseur = true;
    this.allRegionsList = this.regionsDresseur; // Met à jour la liste complète
    this.updatePage(); // Met à jour les données visibles
    this.currentPage = 1;
  }

  // Méthode pour mettre à jour les régions visibles selon la page actuelle
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.regionsPerPage;
    const endIndex = startIndex + this.regionsPerPage;
    this.regionsList = this.allRegionsList.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les boites pokedex visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allRegionsList.length / this.regionsPerPage) }, (_, i) => i + 1);
  }

  // Ouvrir le modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.region;
    this.regionDresseur;
  }

  // Ajouter une nouvelle région
  addRegion(): void {
    if (this.region.id && this.region.nomRegion) {
      const newRegion: Regions = {
        id: 0,
        nomRegion: this.region.nomRegion!,
      }
      
      this.regionService.createRegion(newRegion).subscribe({
        next: () => {
          alert('Région ajoutée !');
          this.getRegions();
          this.closeModal();
        },
        error: (error) => console.error('Erreur lors de l\'ajout de la région:', error),
      });
    }
  }

  // Ajouter une nouvelle région dresseur
  addRegionDresseur(): void {
    if (this.regionDresseur.idRegionDresseur && this.regionDresseur.nomRegionDresseur) {
      const newRegionDresseur: RegionDresseur = {
        idRegionDresseur: 0,
        nomRegionDresseur: this.regionDresseur.nomRegionDresseur!,
      }
      
      this.regionDresseurService.createRegionDresseur(newRegionDresseur).subscribe({
        next: () => {
          alert('Région dresseur ajoutée !');
          this.getRegionsDresseur();
          this.closeModal();
        },
        error: (error) => console.error('Erreur lors de l\'ajout de la région dresseur:', error),
      });
    }
  }
  
  // Supprimer une région par son ID
  deleteRegion(id: number): void {
    this.regionService.deleteRegionById(id).subscribe({
      next: () => {
        this.getRegions();  // Recharger la liste après suppression
      },
      error: (err) => console.error('Erreur lors de la suppression de la région:', err)
    });
  }

  // Supprimer une région dresseur par son ID
  deleteRegionDresseur(id: number): void {
    this.regionDresseurService.deleteRegionDresseurById(id).subscribe({
      next: () => {
        this.getRegionsDresseur();  // Recharger la liste après suppression
      },
      error: (err) => console.error('Erreur lors de la suppression de la régiondresseur:', err)
    });
  }

}