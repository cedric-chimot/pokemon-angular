import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Dresseur } from '../../../../../models/tables/Dresseur';
import { RegionDresseur } from '../../../../../models/tables/RegionDresseur';
import { DresseursService } from '../../../../../services/dresseurs/dresseurs.service';
import { RegionsDresseurService } from '../../../../../services/regions-dresseur/regions-dresseur.service';

@Component({
  selector: 'app-dresseurs-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dresseurs-form.component.html',
  styleUrls: ['./dresseurs-form.component.css']
})
export class DresseursFormComponent {
  dresseur: Partial<Dresseur> = {
    numDresseur: '',
    nomDresseur: '',
    nbPokemon: 0,
    nbShiny: 0,
    regionDresseur: {} as RegionDresseur
  };
  dresseurs: Dresseur[] = [];
  regionsDresseur: RegionDresseur[] = [];
  isModalOpen = true;

  @Output() close = new EventEmitter<void>();

  constructor(
    private dresseurService: DresseursService,
    private regionDresseurService: RegionsDresseurService,
  ) {}

  // Charger toutes les données lors du chargement de la page
  ngOnInit(): void {
    this.getRegions();
  }

  // Méthode pour enregistrer une nouvelle boite pokédex
  onSubmit(): void {
    // Vérifie que tous les champs obligatoires sont renseignés
    if (this.dresseur.numDresseur && this.dresseur.nomDresseur && this.dresseur.regionDresseur) {
      const newDresseur: Dresseur = {
        id: 0, // L'ID sera généré par le backend
        numDresseur: this.dresseur.numDresseur!,
        nomDresseur: this.dresseur.nomDresseur!,
        nbPokemon: this.dresseur.nbPokemon!,
        nbShiny: this.dresseur.nbShiny!,
        regionDresseur: this.dresseur.regionDresseur ? this.regionsDresseur.find(
          (regionDresseur) => regionDresseur.idRegionDresseur === this.dresseur.regionDresseur!.idRegionDresseur
        )! : null
      };

      // Envoi de la requête au backend pour l'enregistrement de la boite
      this.dresseurService.createDresseur(newDresseur).subscribe({
        next: () => {
          alert('Dresseur ajouté !');
          // Réinitialisation des champs du formulaire
          this.dresseur = {
            numDresseur: '',
            nomDresseur: '',
            nbPokemon: 0,
            nbShiny: 0,
            regionDresseur: {} as RegionDresseur
          };
        },
        error: (error) => console.error('Erreur lors de l\'enregistrement du dresseur:', error),
      });
    }
  }

  // Méthode pour récupérer toutes les données associées aux boites
  getRegions(): void {
    this.regionDresseurService.getAllRegionDresseur().subscribe({
      next: (region: RegionDresseur[]) => {
        this.regionsDresseur = region;
      },
      error: (error) => console.error('Erreur lors du chargement des régions dresseur:', error),
    });
  }

  // Méthode pour fermer le modal
  closeModal() {
    this.close.emit(); // Envoie un signal au parent pour fermer le modal
  }

}
