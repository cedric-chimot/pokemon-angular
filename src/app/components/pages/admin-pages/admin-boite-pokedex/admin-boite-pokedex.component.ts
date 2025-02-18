import { Component } from '@angular/core';
import { BoitesPokedexService } from '../../../../services/boites-pokedex/boites-pokedex.service';
import { BoitesPokedex } from '../../../../models/tables/BoitesPokedex';
import { PaginationComponent } from "../../../commons/pagination/pagination/pagination.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BoitesPokedexFormComponent } from "../../forms/boites-pokedex-form/boites-pokedex-form.component";

@Component({
  selector: 'app-admin-boite-pokedex',
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule, BoitesPokedexFormComponent],
  templateUrl: './admin-boite-pokedex.component.html',
  styleUrl: './admin-boite-pokedex.component.css'
})
export class AdminBoitePokedexComponent {
  allBoitesList: any[] = [];
  boitesList: any[] = [];
  boitesPerPage: number = 10;
  currentPage: number = 1;
  isAddModalOpen = false;
  isBoiteModalOpen = false;
  isDeleteModalOpen = false;
  selectedBoite: BoitesPokedex | null = null;
  columnTextColors: string[] = [
    '#191973',
    '#87ceeb',
    '#dda0dd',
    '#6a5acd',
    '#c71585'
  ];

  // Données nécessaires pour le formulaire
  boites: BoitesPokedex[] = [];
  selectedBoiteForDelete: BoitesPokedex | null = null;

  constructor(
    private boitePokedexService: BoitesPokedexService
  ) {}

  ngOnInit(): void {
    this.getBoites();
  }

  // Affichage de la liste des donnés des boites pokedex
  getBoites(): void {
    this.boitePokedexService.getAllBoitesPokedex().subscribe({
      next: (boite: any[]) => {
        console.log('Données après mise à jour :', boite); // Vérifie les données reçues
        this.allBoitesList = boite;
        this.updatePage();
      },
      error: (error) => console.error('Erreur lors du chargement des boites:', error),
    });
  }

  // Méthode pour mettre à jour les boites pokedex visibles selon la page actuelle
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.boitesPerPage;
    const endIndex = startIndex + this.boitesPerPage;
    this.boitesList = this.allBoitesList.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les boites pokedex visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allBoitesList.length / this.boitesPerPage) }, (_, i) => i + 1);
  }

  // Méthode pour ouvrir le modal
  openBoiteModal(boite: BoitesPokedex): void {
    // Copie sécurisée d'une boite pokedex sélectionné pour l'affichage
    this.selectedBoite = { ...boite };

    if (this.selectedBoite.nomBoite && this.selectedBoite.id) {
      this.selectedBoite.nomBoite = this.selectedBoite.nomBoite;
      this.isBoiteModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Région invalide ou non définie pour ce Pokémon');
      this.isBoiteModalOpen = true;
    }
  }

  // Méthode pour ouvrir le modal d'ajout
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  // Méthode pour ouvrir le modal de suppression
  openDeleteModal(boite: BoitesPokedex): void {
    this.selectedBoiteForDelete = { ...boite } as unknown as BoitesPokedex;  // Copie complète pour la suppression
    this.isDeleteModalOpen = true;  // Ouvre le modal de suppression
  }

  // Méthode pour mettre à jour une boite pokedex
  updateBoitePokedex(): void {
    if (this.selectedBoite) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedBoite: any = {
        id: this.selectedBoite.id,
        nom: this.selectedBoite.nomBoite,
        nbMales: this.selectedBoite.nbMales,
        nbFemelles: this.selectedBoite.nbFemelles,
        nbAssexues: this.selectedBoite.nbAssexues,
        nbLevel100: this.selectedBoite.nbLevel100,
      };

      // Ajout du log pour vérifier les données envoyées
      console.log('Données envoyées au serveur :', updatedBoite);

      this.boitePokedexService.updateBoitePokedex(updatedBoite).subscribe({
        next: () => {
          this.getBoites(); // Rafraîchit les données après mise à jour
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la mise à jour de la boite :', err),
      });
    }
  }

  // Méthode pour supprimer le Pokémon après confirmation
  confirmDeleteBoite(): void {
    if (this.selectedBoiteForDelete && this.selectedBoiteForDelete.id) {
      this.boitePokedexService.deleteBoiteById(this.selectedBoiteForDelete.id).subscribe({
        next: () => {
          this.getBoites();  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de la Boite:', err)
      });
    } else {
      console.error('Aucune Boite sélectionnée pour suppression');
    }
  }

  // Fermer le modal
  closeModal(): void {
    this.isBoiteModalOpen = false;
    this.selectedBoite = null;
    this.isAddModalOpen = false;
    this.isDeleteModalOpen = false;
    this.selectedBoiteForDelete = null;
  }

}
