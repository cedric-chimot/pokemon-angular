import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../commons/pagination/pagination/pagination.component';
import { Type } from '../../../../models/tables/Type';
import { TypesService } from '../../../../services/types/types.service';

@Component({
  selector: 'app-admin-types',
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.css']
})
export class AdminTypesComponent {
  allTypesList: any[] = [];
  typesList: any[] = [];
  typesPerPage: number = 9;
  currentPage: number = 1;
  isTypeModalOpen = false;
  isDeleteTypeModalOpen = false;
  selectedType: Type | null = null;
  selectedTypeForDelete: Type | null = null;

  // Données nécessaires pour le formulaire
  types: Type[] = [];

  constructor(
    private typeService: TypesService
  ) {}

  ngOnInit(): void {
    this.getTypes();
  }

  // Affichage de la liste des donnés des natures
  getTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (type: any[]) => {
        this.allTypesList = type;
        this.updatePage();
      },
      error: (error) => console.error('Erreur lors du chargement des types:', error),
    });
  }

  // Méthode pour mettre à jour les pokeballs visibles selon la page actuelle
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.typesPerPage;
    const endIndex = startIndex + this.typesPerPage;
    this.typesList = this.allTypesList.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les pokeballs visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allTypesList.length / this.typesPerPage) }, (_, i) => i + 1);
  }

  // Méthode pour ouvrir le modal
  openTypeModal(type: Type): void {
    // Copie sécurisée d'une pokeball sélectionnée pour l'affichage
    this.selectedType = { ...type };

    if (this.selectedType.nomType && this.selectedType.id) {
      this.selectedType.nomType = this.selectedType.nomType;
      this.isTypeModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Type invalide ou non défini pour ce Pokémon');
      this.isTypeModalOpen = true;
    }
  }

  // Méthode pour ouvrir le modal de suppression
  openDeleteTypeModal(type: Type): void {
    this.selectedTypeForDelete = { ...type } as unknown as Type;  // Copie complète pour la suppression
    this.isDeleteTypeModalOpen = true;  // Ouvre le modal de suppression
  }

  // Méthode pour mettre à jour une pokeball
  updateType(): void {
    if (this.selectedType) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedType: any = {
        id: this.selectedType.id,
        nomPokeball: this.selectedType.nomType,
        nbShiny: this.selectedType.nbShiny,
      };

      this.typeService.updateType(updatedType).subscribe({
        next: () => {
          this.getTypes(); // Rafraîchit les données après mise à jour
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la mise à jour du type:', err),
      });
    }
  }

  // Fermer le modal
  closeModal(): void {
    this.isTypeModalOpen = false;
    this.selectedType = null;
    this.isDeleteTypeModalOpen = false;
    this.selectedTypeForDelete = null;
  }

  // Supprimer un type par son ID
  deleteType(): void {
    if (this.selectedTypeForDelete && this.selectedTypeForDelete.id) {
      this.typeService.deleteTypeById(this.selectedTypeForDelete.id).subscribe({
        next: () => {
          this.getTypes();  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression du Sexe:', err)
      });
    } else {
      console.error('Aucun Sexe sélectionné pour suppression');
    }
  }

}
