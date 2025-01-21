import { Component, Input, OnInit } from '@angular/core';
import { AttaquesService } from '../../../../services/attaques/attaques.service';
import { ColorsService } from '../../../../services/colors/colors.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from "../../../commons/pagination/pagination/pagination.component";
import { Attaques } from '../../../../models/tables/Attaques';
import { FormsModule } from '@angular/forms';
import { Type } from '../../../../models/tables/Type';
import { TypesService } from '../../../../services/types/types.service';

@Component({
  selector: 'app-admin-attaques',
  imports: [CommonModule, RouterModule, PaginationComponent, FormsModule],
  templateUrl: './admin-attaques.component.html',
  styleUrls: ['./admin-attaques.component.css']
})
export class AdminAttaquesComponent implements OnInit {
  type: string[] = []; 
  allAttacksList: any[] = [];
  attacksList: any[] = [];
  currentPage: number = 1; 
  attacksPerPage: number = 5; 
  idType: number = 1; 
  typeSelected: string = ''; 
  selectedAttaque: Attaques | null = null;
  isModalOpen = false;
  types: Type[] = [];

  constructor(
    private attaquesService: AttaquesService,
    private typesService: TypesService,
    private colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.loadTypes();
    this.getAttacks();
    this.getTypes();
  }

  // Méthode pour charger les types
  loadTypes(): void {
    this.type = Object.keys(this.colorsService['typeColors']);
  }

  // Méthode pour récupérer les attaques pour le type sélectionné
  getAttacks(): void {
    this.attaquesService.getAttaquesByType(this.idType).subscribe({
      next: (attacks: any[]) => {
        this.allAttacksList = attacks; // Stocke toutes les attaques
        this.updatePage(); // Met à jour les attaques visibles sur la page
  
        // On vérifie si le type est juste une chaîne, et on récupère l'objet complet du type
        this.allAttacksList.forEach(attaque => {
          if (typeof attaque.type === 'string') {
            // Si le type est une chaîne, on doit le remplacer par l'objet complet en fonction de son ID
            const typeId = this.types.find(type => type.nomType === attaque.type)?.id;
            if (typeId) {
              this.typesService.getTypeById(typeId).subscribe({
                next: (type: Type) => {
                  attaque.type = type; // Remplacer la chaîne par l'objet du type
                },
                error: (err) => console.error('Erreur lors de la récupération du type :', err),
              });
            }
          }
        });
      },
      error: (error) => console.error('Erreur lors du chargement des attaques:', error),
    });
  }
  
  // Méthode pour récupérer les types
  getTypes(): void {
    this.typesService.getAllTypes().subscribe({
      next: (types: Type[]) => {
        this.types = types; // Stocke les types
      },
      error: (error) => console.error('Erreur lors du chargement des types:', error),
    });
  }

  // Méthode pour changer le type sélectionné
  changeType(typeId: number): void {
    this.idType = typeId;
    this.typeSelected = this.type[typeId - 1];  
    this.currentPage = 1;
    this.getAttacks();  // Récupère les attaques pour le nouveau type
  }
  
  // Méthode pour récupérer la couleur d'un type
  getTypeColor(type: string): string {
    return this.colorsService.getTypeColor(type);
  }

  // Méthode pour mettre à jour les attaques visibles selon la page actuelle
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.attacksPerPage;
    const endIndex = startIndex + this.attacksPerPage;
    this.attacksList = this.allAttacksList.slice(startIndex, endIndex);
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les attaques visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allAttacksList.length / this.attacksPerPage) }, (_, i) => i + 1);
  }
  
  // Ouvrir le modal pour la modification d'une attaque
  openModal(attaque: Attaques): void {
    // Copie sécurisée de l'attaque sélectionnée
    this.selectedAttaque = { ...attaque };
  
    // Vérifie si un type est lié à l'attaque
    if (this.selectedAttaque.typeAttaque && this.selectedAttaque.typeAttaque.id) {
      this.selectedAttaque.typeAttaque = this.selectedAttaque.typeAttaque; // Assigner le type directement
      this.isModalOpen = true; // Ouvrir le modal après avoir récupéré le type
    } else {
      console.error('Type invalide ou non défini pour cette attaque');
      this.selectedAttaque.typeAttaque = this.types[0]; // Si 'types' contient des données
      this.isModalOpen = true;
    }
  }
  
  updateAttaque(): void {
    if (this.selectedAttaque && this.selectedAttaque.typeAttaque) {
      const updatedAttaque = {
        id: this.selectedAttaque.id,
        nomAttaque: this.selectedAttaque.nomAttaque,
        typeAttaque: this.selectedAttaque.typeAttaque // Le type est bien présent ici
      };
  
      this.attaquesService.updateAttaque(updatedAttaque).subscribe({
        next: (res) => {
          this.getAttacks(); // Recharger les attaques après la mise à jour
          this.closeModal(); // Fermer le modal
        },
        error: (err) => console.error('Erreur lors de la mise à jour :', err),
      });
    } else {
      console.error('Le type est vide ou non défini pour cette attaque.');
    }
  }
  
  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedAttaque = null;
  }

  // Supprimer une attaque par son ID
  deleteAttaque(id: number): void {
    this.attaquesService.deleteAttaqueById(id).subscribe({
      next: () => {
        this.getAttacks();  // Recharger la liste après suppression
      },
      error: (err) => console.error('Erreur lors de la suppression de l\'attaque:', err)
    });
  }
}
