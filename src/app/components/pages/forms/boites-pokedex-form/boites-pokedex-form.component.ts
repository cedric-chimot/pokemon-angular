import { Component, EventEmitter, Output } from '@angular/core';
import { BoitesPokedexService } from '../../../../services/boites-pokedex/boites-pokedex.service';
import { BoitesPokedex } from '../../../../models/tables/BoitesPokedex';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boites-pokedex-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './boites-pokedex-form.component.html',
  styleUrls: ['./boites-pokedex-form.component.css']
})
export class BoitesPokedexFormComponent {
  boite: Partial<BoitesPokedex> = {
    nomBoite: '',
    nbMales: 0,
    nbFemelles: 0,
    nbAssexues: 0,
    nbLevel100: 0
  };
  boites: BoitesPokedex[] = [];
  isModalOpen = true;

  @Output() close = new EventEmitter<void>();

  constructor(
    private boitePokedexService: BoitesPokedexService
  ) {}

  // Charger toutes les données lors du chargement de la page
  ngOnInit(): void {
    this.getDatas();
  }

  // Méthode pour enregistrer une nouvelle boite pokédex
  onSubmit(): void {
    // Vérifie que tous les champs obligatoires sont renseignés
    if (this.boite.nomBoite && this.boite.nbMales && this.boite.nbFemelles && this.boite.nbAssexues && this.boite.nbLevel100) {
      const newBoite: BoitesPokedex = {
        id: 0, // L'ID sera généré par le backend
        nomBoite: this.boite.nomBoite!,
        nbMales: this.boite.nbMales!,
        nbFemelles: this.boite.nbFemelles!,
        nbAssexues: this.boite.nbAssexues!,
        nbLevel100: this.boite.nbLevel100!
      };

      // Envoi de la requête au backend pour l'enregistrement de la boite
      this.boitePokedexService.createBoitePokedex(newBoite).subscribe({
        next: () => {
          alert('Boite ajoutée !');
          // Réinitialisation des champs du formulaire
          this.boite = {
            nomBoite: '',
            nbMales: 0,
            nbFemelles: 0,
            nbAssexues: 0,
            nbLevel100: 0
          };
        },
        error: (error) => console.error('Erreur lors de l\'enregistrement de la boite:', error),
      });
    }
  }

  // Méthode pour récupérer toutes les données associées aux boites
  getDatas(): void {
    this.boitePokedexService.getAllBoitesPokedex().subscribe({
      next: (boite: BoitesPokedex[]) => {
        this.boites = boite;
      },
      error: (error) => console.error('Erreur lors du chargement des boites:', error),
    });
  }

  // Méthode pour fermer le modal
  closeModal() {
    this.close.emit(); // Envoie un signal au parent pour fermer le modal
  }

}

