import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../commons/pagination/pagination/pagination.component';
import { Regions } from '../../../../models/tables/Regions';
import { RegionDresseur } from '../../../../models/tables/RegionDresseur';
import { RegionsDresseurService } from '../../../../services/regions-dresseur/regions-dresseur.service';
import { RegionsService } from '../../../../services/regions/regions.service';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';

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
  pokemonsCountByRegion: { [key: string]: number } = {};

  // Gestion des vues
  showRegions = true; // Détermine la vue active
  showRegionsDresseur = true;
  isModalOpen = false; // Contrôle l'ouverture du modal
  selectedRegionForDelete: Regions | null = null;
  selectedRegionDresseurForDelete: RegionDresseur | null = null;
  isDeleteModalOpen = false;

  // Objets pour les formulaires
  region: Partial<Regions> = { id: 0, nomRegion: '' };
  regionDresseur: Partial<RegionDresseur> = { idRegionDresseur: 0, nomRegionDresseur: '' };

  constructor(
    private regionService: RegionsService,
    private pokedexService: PokedexNationalService,
    private regionDresseurService: RegionsDresseurService
  ) {}

  ngOnInit(): void {
    this.showRegion();
    this.getRegions();
    this.getRegionsDresseur();
    this.getNbPokemonsByRegions();
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

  // Méthode pour récupérer les Pokémon par région
  getNbPokemonsByRegions(): void {
    this.pokedexService.getNbPokemonsByRegions().subscribe({
      next: (response: any[]) => {
        this.pokemonsCountByRegion = response.reduce((acc, item) => {
          const [nomRegion, count] = item;
          acc[nomRegion] = count; // Mappe la région au nombre de Pokémon
          return acc;
        }, {});
      },
      error: (err: any) => console.error('Erreur lors de la récupération des données:', err)
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

  // Méthode pour ouvrir le modal de suppression (Régions)
  openDeleteRegionModal(region: Regions): void {
    this.selectedRegionForDelete = { ...region } as unknown as Regions;  // Copie complète pour la suppression
    this.isDeleteModalOpen = true;  // Ouvre le modal de suppression
  }

  // Méthode pour ouvrir le modal de suppression (Régions)
  openDeleteRegionDresseurModal(regionDresseur: RegionDresseur): void {
    this.selectedRegionDresseurForDelete = { ...regionDresseur } as unknown as RegionDresseur;  // Copie complète pour la suppression
    this.isDeleteModalOpen = true;  // Ouvre le modal de suppression
  }

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.region;
    this.regionDresseur;
    this.isDeleteModalOpen = false;
    this.selectedRegionForDelete = null;
    this.selectedRegionDresseurForDelete = null;
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

  // Supprimer une région après confirmation
  deleteRegion(): void {
    if (this.selectedRegionForDelete && this.selectedRegionForDelete.id) {
      this.regionService.deleteRegionById(this.selectedRegionForDelete.id).subscribe({
        next: () => {
          this.getRegions();  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de la Région:', err)
      });
    } else {
      console.error('Aucune Région sélectionnée pour suppression');
    }
  }

  // Supprimer une région dresseur après confirmation
  deleteRegionDresseur(): void {
    if (this.selectedRegionDresseurForDelete && this.selectedRegionDresseurForDelete.idRegionDresseur) {
      this.regionDresseurService.deleteRegionDresseurById(this.selectedRegionDresseurForDelete.idRegionDresseur).subscribe({
        next: () => {
          this.getRegions();  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de la Région Dresseur:', err)
      });
    } else {
      console.error('Aucune Région Dresseur sélectionnée pour suppression');
    }
  }

}
