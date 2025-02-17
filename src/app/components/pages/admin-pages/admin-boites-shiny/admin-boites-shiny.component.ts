import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Boites } from '../../../../models/stats/Boites';
import { BoitesShinyService } from '../../../../services/boites-shiny/boites-shiny.service';
import { BoitesShinyFormComponent } from "../../forms/boites-shiny-form/boites-shiny-form/boites-shiny-form.component";

@Component({
  selector: 'app-admin-boites-shiny',
  imports: [CommonModule, RouterModule, FormsModule, BoitesShinyFormComponent],
  templateUrl: './admin-boites-shiny.component.html',
  styleUrls: ['./admin-boites-shiny.component.css']
})
export class AdminBoitesShinyComponent {
  allBoitesList: any[] = [];
  boitesList: any[] = [];
  isBoiteModalOpen = false;
  isAddModalOpen = false;
  isDeleteModalOpen = false;
  selectedBoite: Boites | null = null;
  selectedBoiteForDelete: Boites | null = null;
  columnTextColors: string[] = [
    '#191973',
    '#0f52ba'
  ];

  // Données nécessaires pour le formulaire
  boites: Boites[] = [];

  constructor(
    private boiteShinyService: BoitesShinyService
  ) {}

  ngOnInit(): void {
    this.getBoites();
  }

  // Affichage de la liste des donnés des boites shiny
  getBoites(): void {
    this.boiteShinyService.getAllBoites().subscribe({
      next: (boite: any[]) => {
        console.log('Données après mise à jour :', boite); // Vérifie les données reçues
        this.allBoitesList = boite;
      },
      error: (error) => console.error('Erreur lors du chargement des boites:', error),
    });
  }

  // Méthode pour ouvrir le modal
  openBoiteModal(boite: Boites): void {
    // Copie sécurisée d'une boite pokedex sélectionné pour l'affichage
    this.selectedBoite = { ...boite };

    if (this.selectedBoite.nom && this.selectedBoite.id) {
      this.selectedBoite.nom = this.selectedBoite.nom;
      this.isBoiteModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Boite invalide ou non définie pour ce Pokémon');
      this.isBoiteModalOpen = true;
    }
  }

  // Méthode pour ouvrir le modal d'ajout
  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  // Méthode pour ouvrir le modal de suppression
  openDeleteModal(boite: Boites): void {
    this.selectedBoiteForDelete = { ...boite } as unknown as Boites;  // Copie complète pour la suppression
    this.isDeleteModalOpen = true;  // Ouvre le modal de suppression
  }

  // Méthode pour mettre à jour une boite pokedex
  updateBoiteShiny(): void {
    if (this.selectedBoite) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedBoite: any = {
        id: this.selectedBoite.id,
        nom: this.selectedBoite.nom,
        nbLevel100: this.selectedBoite.nbLevel100
      };

      // Ajout du log pour vérifier les données envoyées
      console.log('Données envoyées au serveur :', updatedBoite);

      this.boiteShinyService.updateBoite(updatedBoite).subscribe({
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
      this.boiteShinyService.deleteBoiteById(this.selectedBoiteForDelete.id).subscribe({
        next: () => {
          this.getBoites();  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression du Pokémon:', err)
      });
    } else {
      console.error('Aucun Pokémon sélectionné pour suppression');
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
