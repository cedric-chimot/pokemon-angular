import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Boites } from '../../../../models/stats/Boites';
import { BoitesShinyService } from '../../../../services/boites-shiny/boites-shiny.service';

@Component({
  selector: 'app-admin-boites-shiny',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-boites-shiny.component.html',
  styleUrls: ['./admin-boites-shiny.component.css']
})
export class AdminBoitesShinyComponent {
  allBoitesList: any[] = [];
  boitesList: any[] = [];
  isModalOpen = false;
  selectedBoite: Boites | null = null;
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
      this.isModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Boite invalide ou non définie pour ce Pokémon');
      this.isModalOpen = true;
    }
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

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedBoite = null;
  }

  // Supprimer une boite par son ID
  deleteBoite(id: number): void {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette boite ? Cette action est irréversible.")) {
      this.boiteShinyService.deleteBoiteById(id).subscribe({
        next: () => {
          this.getBoites();  // Recharger la liste après suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de la boite:', err)
      });
    }
  }

}
