import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Boites } from '../../../../../models/stats/Boites';
import { BoitesShinyService } from '../../../../../services/boites-shiny/boites-shiny.service';

@Component({
  selector: 'app-boites-shiny-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './boites-shiny-form.component.html',
  styleUrls: ['./boites-shiny-form.component.css']
})
export class BoitesShinyFormComponent {
  boite: Partial<Boites> = {
    nom: '',
    nbLevel100: 0,
    natures: [],
    dresseurs: [],
    pokeballs: [],
    types: [],
    sexes: []
  };
  boites: Boites[] = [];

  constructor(
    private boiteShinyService: BoitesShinyService
  ) {}

  // Charger toutes les données lors du chargement de la page
  ngOnInit(): void {
  }

  // Méthode pour enregistrer un nouveau pokémon shiny
  onSubmit(): void {
    if (
        this.boite.nom &&
        this.boite.nbLevel100) {

      const newBoite: Boites = {
        id: 0, // L'ID sera généré par le backend
        nom: this.boite.nom!,
        nbLevel100: this.boite.nbLevel100!,
        pokeballs: [],
        dresseurs: [],
        sexes: [],
        natures: [],
        types: []
      };

      this.boiteShinyService.createBoite(newBoite).subscribe({
        next: (data) => {
          console.log('Pokémon ajouté avec succès:', data);
          alert('Pokémon ajouté !');
          // Réinitialisation du formulaire
          this.boite = { nom: '', nbLevel100: 0 };
        },
        error: (err) =>
          alert('Erreur lors de l’ajout du boite' + err),
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

}
