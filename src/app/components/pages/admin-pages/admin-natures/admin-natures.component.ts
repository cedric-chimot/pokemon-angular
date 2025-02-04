import { Component } from '@angular/core';
import { NaturesService } from '../../../../services/natures/natures.service';
import { Nature } from '../../../../models/tables/Nature';
import { PaginationComponent } from "../../../commons/pagination/pagination/pagination.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-natures',
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './admin-natures.component.html',
  styleUrl: './admin-natures.component.css'
})
export class AdminNaturesComponent {
  allNaturesList: any[] = [];
  naturesList: any[] = [];
  naturesPerPage: number = 10; 
  currentPage: number = 1; 
  isModalOpen = false;
  selectedNature: Nature | null = null;

  // Données nécessaires pour le formulaire
  natures: Nature[] = [];

  constructor(
    private natureService: NaturesService
  ) {}

  ngOnInit(): void {
    this.getNatures();
  }

  // Affichage de la liste des donnés des natures
  getNatures(): void {
    this.natureService.getAllNatures().subscribe({
      next: (nature: any[]) => {
        console.log('Données après mise à jour :', nature); // Vérifie les données reçues
        this.allNaturesList = nature; 
        this.updatePage();
      },
      error: (error) => console.error('Erreur lors du chargement des natures:', error),
    });
  }
  
  // Méthode pour mettre à jour les natures visibles selon la page actuelle
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.naturesPerPage;
    const endIndex = startIndex + this.naturesPerPage;
    this.naturesList = this.allNaturesList.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les pokeballs visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allNaturesList.length / this.naturesPerPage) }, (_, i) => i + 1);
  }

  // Méthode pour ouvrir le modal
  openNatureModal(nature: Nature): void {
    // Copie sécurisée d'une nature sélectionnée pour l'affichage
    this.selectedNature = { ...nature };
    
    if (this.selectedNature.nomNature && this.selectedNature.id) {
      this.selectedNature.nomNature = this.selectedNature.nomNature; 
      this.isModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Nature invalide ou non définie pour ce Pokémon');
      this.isModalOpen = true;
    }
  }

  // Méthode pour mettre à jour une nature
  updateNature(): void {
    if (this.selectedNature) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedNature: any = {
        id: this.selectedNature.id,
        nomNature: this.selectedNature.nomNature,
        nbPokemon: this.selectedNature.nbPokemon,
        nbShiny: this.selectedNature.nbShiny,
      };
    
      this.natureService.updateNature(updatedNature).subscribe({
        next: () => {
          this.getNatures(); // Rafraîchit les données après mise à jour
          this.closeModal(); 
        },
        error: (err) => console.error('Erreur lors de la mise à jour de la nature:', err),
      });
    }
  }
  
  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedNature = null; 
  }

  // Supprimer une nature par son ID
  deleteNature(id: number): void {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette nature ? Cette action est irréversible.")) {
      this.natureService.deleteNatureById(id).subscribe({
        next: () => {
          this.getNatures();  // Recharger la liste après suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de la nature:', err)
      });
    }
  }

}
