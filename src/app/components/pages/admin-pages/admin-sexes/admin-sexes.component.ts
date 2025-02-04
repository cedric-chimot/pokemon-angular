import { Component } from '@angular/core';
import { SexesService } from '../../../../services/sexes/sexes.service';
import { Sexe } from '../../../../models/tables/Sexe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorsService } from '../../../../services/colors/colors.service';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { GraphComponent } from "../../../commons/graph/graph.component";

@Component({
  selector: 'app-admin-sexes',
  imports: [CommonModule, RouterModule, FormsModule, GraphComponent],
  templateUrl: './admin-sexes.component.html',
  styleUrls: ['./admin-sexes.component.css']
})
export class AdminSexesComponent {
  sexesList: any[] = [];
  isModalOpen = false;
  selectedSexe: Sexe | null = null;
  chartData: { [key: string]: number[] } = {};
  chartLabels: { [key: string]: string[] } = {};
  chartColors: { [key: string]: string[] } = {};
  
  sexes: Sexe[] = [];
  categoriesStats: any[] = []; // Initialiser comme un tableau vide

  constructor(
    private sexeService: SexesService,
    private colorsService: ColorsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesStats = this.getCategories();
    this.getSexes();
  }

  // Affichage de la liste des donnés des sexes
  getSexes(): void {
    this.sexeService.getAllSexes().subscribe({
      next: (sexe: any[]) => {
        console.log('Données après mise à jour :', sexe); // Vérifie les données reçues
        this.sexesList = sexe;
        this.chartData['genres'] = sexe.map((nbTotal: { nbTotal: number }) => nbTotal.nbTotal);
        this.chartLabels['genres'] = sexe.map((sexe: { sexe: string }) => sexe.sexe);
        this.chartColors['genres'] = sexe.map((sexe: { sexe: string }) =>
          this.colorsService.getSexeColor(sexe.sexe)
        );
      },
      error: (error) => console.error('Erreur lors du chargement des sexes:', error),
    });
  }
  
  openModal(): void {
    this.isModalOpen = true;
  }

  // Méthode pour ouvrir le modal
  openSexeModal(sexe: Sexe): void {
    // Copie sécurisée d'une nature sélectionnée pour l'affichage
    this.selectedSexe = { ...sexe };
    
    if (this.selectedSexe.sexe && this.selectedSexe.id) {
      this.selectedSexe.sexe = this.selectedSexe.sexe; 
      this.isModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Sexe invalide ou non défini pour ce Pokémon');
      this.isModalOpen = true;
    }
  }

  // Méthode pour mettre à jour un sexe
  updateSexe(): void {
    if (this.selectedSexe) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedSexe: any = {
        id: this.selectedSexe.id,
        nomNature: this.selectedSexe.sexe,
        nbTotal: this.selectedSexe.nbTotal,
        nbShiny: this.selectedSexe.nbShiny,
      };
    
      this.sexeService.updateSexe(updatedSexe).subscribe({
        next: () => {
          this.getSexes(); // Rafraîchit les données après mise à jour
          this.closeModal(); 
        },
        error: (err) => console.error('Erreur lors de la mise à jour du sexe:', err),
      });
    }
  }

  // Méthode pour récupérer les catégories disponibles
  getCategories() {
    return this.categoriesService.getCategoriesStats();
  }

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedSexe = null; 
  }

  // Supprimer un sexe par son ID
  deleteSexe(id: number): void {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce genre ? Cette action est irréversible.")) {
      this.sexeService.deleteSexeById(id).subscribe({
        next: () => {
          this.getSexes();  // Recharger la liste après suppression
        },
        error: (err) => console.error('Erreur lors de la suppression du sexe:', err)
      });
    }
  }

}
