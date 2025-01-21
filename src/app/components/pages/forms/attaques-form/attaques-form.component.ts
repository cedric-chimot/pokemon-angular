import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Attaques } from '../../../../models/tables/Attaques';
import { Type } from '../../../../models/tables/Type';
import { AttaquesService } from '../../../../services/attaques/attaques.service';
import { TypesService } from '../../../../services/types/types.service';

@Component({
  selector: 'app-attaques-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './attaques-form.component.html',
  styleUrls: ['./attaques-form.component.css']
})
export class AttaquesFormComponent implements OnInit {
  attaque: Partial<Attaques> = {
    nomAttaque: '',
    typeAttaque: {} as Type,
  };
  types: Type[] = [];

  constructor(
    private typesService: TypesService,
    private attaquesService: AttaquesService
  ) {}
  
  // Charger tous les types lors du chargement de la page
  ngOnInit(): void {
    this.getTypes();
  }

  // Méthode pour enregistrer une nouvelle attaque
  onSubmit(): void {
    if (this.attaque.nomAttaque && this.attaque.typeAttaque) {
      // Crée une attaque avec le type sélectionné
      const newAttaque: Attaques = {
        id: 0, // L'ID sera généré par le backend
        nomAttaque: this.attaque.nomAttaque!,
        typeAttaque: this.types.find(
          (type) => type.id === this.attaque.typeAttaque!.id
        )!,
      };

      this.attaquesService.createAttaque(newAttaque).subscribe({
        next: (data) => {
          console.log('Attaque ajoutée avec succès:', data);
          alert('Attaque ajoutée !');
          // Réinitialisation du formulaire
          this.attaque = { nomAttaque: '', typeAttaque: {} as Type };
        },
        error: (err) =>
          alert('Erreur lors de l’ajout de l’attaque' + err),
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
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

}
