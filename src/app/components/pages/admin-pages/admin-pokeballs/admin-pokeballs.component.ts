import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../commons/pagination/pagination/pagination.component';
import { Pokeball } from '../../../../models/tables/PokeBall';
import { PokeballsService } from '../../../../services/pokeballs/pokeballs.service';

@Component({
  selector: 'app-admin-pokeballs',
  imports: [CommonModule, RouterModule, FormsModule, PaginationComponent],
  templateUrl: './admin-pokeballs.component.html',
  styleUrls: ['./admin-pokeballs.component.css']
})
export class AdminPokeballsComponent {
  allPokeballsList: any[] = [];
  pokeballsList: any[] = [];
  pokeballsPerPage: number = 10;
  currentPage: number = 1;
  isPokeballModalOpen = false;
  isDeleteModalOpen = false;
  selectedPokeball: Pokeball | null = null;
  selectedPokeballForDelete: Pokeball | null = null;

  // Données nécessaires pour le formulaire
  pokeballs: Pokeball[] = [];

  constructor(
    private pokeballService: PokeballsService
  ) {}

  ngOnInit(): void {
    this.getPokeballs();
  }

  // Affichage de la liste des donnés des natures
  getPokeballs(): void {
    this.pokeballService.getAllPokeballsForAdmin().subscribe({
      next: (pokeball: any[]) => {
        this.allPokeballsList = pokeball;
        this.updatePage();
      },
      error: (error) => console.error('Erreur lors du chargement des pokeballs:', error),
    });
  }

  // Méthode pour mettre à jour les pokeballs visibles selon la page actuelle
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.pokeballsPerPage;
    const endIndex = startIndex + this.pokeballsPerPage;
    this.pokeballsList = this.allPokeballsList.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les pokeballs visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allPokeballsList.length / this.pokeballsPerPage) }, (_, i) => i + 1);
  }

  // Méthode pour ouvrir le modal
  openPokeballModal(pokeball: Pokeball): void {
    // Copie sécurisée d'une pokeball sélectionnée pour l'affichage
    this.selectedPokeball = { ...pokeball };

    if (this.selectedPokeball.nomPokeball && this.selectedPokeball.id) {
      this.selectedPokeball.nomPokeball = this.selectedPokeball.nomPokeball;
      this.isPokeballModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Pokeball invalide ou non définie pour ce Pokémon');
      this.isPokeballModalOpen = true;
    }
  }

  // Méthode pour ouvrir le modal de suppression
  openDeleteModal(pokeball: Pokeball): void {
    this.selectedPokeballForDelete = { ...pokeball } as unknown as Pokeball;  // Copie complète pour la suppression
    this.isDeleteModalOpen = true;  // Ouvre le modal de suppression
  }

  // Méthode pour mettre à jour une pokeball
  updatePokeball(): void {
    if (this.selectedPokeball) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedPokeball: any = {
        id: this.selectedPokeball.id,
        nomPokeball: this.selectedPokeball.nomPokeball,
        nbPokemon: this.selectedPokeball.nbPokemon,
        nbShiny: this.selectedPokeball.nbShiny,
      };

      this.pokeballService.updatePokeball(updatedPokeball).subscribe({
        next: () => {
          this.getPokeballs(); // Rafraîchit les données après mise à jour
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la mise à jour de la pokeball:', err),
      });
    }
  }

  // Fermer le modal
  closeModal(): void {
    this.isPokeballModalOpen = false;
    this.selectedPokeball = null;
    this.isDeleteModalOpen = false;
    this.selectedPokeballForDelete = null;
  }

  // Supprimer une pokeball par son ID
  deletePokeball(): void {
    if (this.selectedPokeballForDelete && this.selectedPokeballForDelete.id) {
      this.pokeballService.deletePokeballById(this.selectedPokeballForDelete.id).subscribe({
        next: () => {
          this.getPokeballs();  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression de la Pokéball:', err)
      });
    } else {
      console.error('Aucune Pokéball sélectionnée pour suppression');
    }
  }

}
