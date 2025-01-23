import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegionSwitcherComponent } from "../../../commons/region-switcher/region-switcher.component";
import { PokedexRegions } from '../../../../models/tables/Pokedex-Regions';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';
import { PaginationComponent } from "../../../commons/pagination/pagination/pagination.component";
import { Dresseur } from '../../../../models/tables/Dresseur';
import { FormsModule } from '@angular/forms';
import { Nature } from '../../../../models/tables/Nature';
import { Pokeball } from '../../../../models/tables/PokeBall';
import { Regions } from '../../../../models/tables/Regions';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { NaturesService } from '../../../../services/natures/natures.service';
import { PokeballsService } from '../../../../services/pokeballs/pokeballs.service';
import { RegionsService } from '../../../../services/regions/regions.service';
import { PokedexNational } from '../../../../models/tables/PokedexNational';
import { BoitesPokedexService } from '../../../../services/boites-pokedex/boites-pokedex.service';

@Component({
  selector: 'app-admin-pokedex',
  imports: [CommonModule, RouterModule, RegionSwitcherComponent, PaginationComponent, FormsModule],
  templateUrl: './admin-pokedex.component.html',
  styleUrls: ['./admin-pokedex.component.css']
})
export class AdminPokedexComponent {
  pokemons: PokedexRegions[] = [];
  allPokemonsList: any[] = [];
  pokemonsList: any[] = [];
  pokemonsPerPage: number = 9; 
  @Input() region: number = 1; // La région est reçue du parent (regionSwitcher)
  @Output() regionSelected = new EventEmitter<number>();
  currentPage: number = 1; 
  isModalOpen = false;

  // Variables distinctes pour l'affichage et la modification
  selectedPokemonForDisplay: PokedexRegions | null = null; // Pour l'affichage uniquement
  selectedPokemonForEdit: PokedexNational | null = null;  // Pour la modification (modèle complet)

  // Données nécessaires pour le formulaire
  dresseurs: Dresseur[] = []; 
  regions: Regions[] = [];
  natures: Nature[] = [];
  pokeballs: Pokeball[] = [];

  constructor(
    private pokedexService: PokedexNationalService,
    private regionService: RegionsService,
    private dresseurService: DresseursService,
    private natureService: NaturesService,
    private pokeballService: PokeballsService,
    private boitePokedexService: BoitesPokedexService
  ) {}

  ngOnInit(): void {
    this.fetchPokemonsByRegion(this.region);
    this.getDatas();
  }

  fetchPokemonsByRegion(regionId: number): void {
    this.pokedexService.getPokemonsByRegionForAdmin(regionId).subscribe({
      next: (pokemons: any[]) => {
        this.allPokemonsList = pokemons;
  
        // On vérifie que la clé étrangère existe avant d'y accéder
        this.allPokemonsList.forEach(pokemon => {
          if (typeof pokemon.dresseurPokedex === 'string') {
            const dresseur = this.dresseurs.find(dresseur => dresseur.nomDresseur === pokemon.dresseurPokedex);
            if (dresseur) {
              this.dresseurService.getDresseurById(pokemon.dresseurPokedex.id).subscribe({
                next: (dresseur) => pokemon.dresseurPokedex = dresseur,
                error: (err) => console.error('Erreur de récupération du dresseur:', err)
              });
            }
          }

          if (typeof pokemon.naturePokedex === 'string') {
            const nature = this.natures.find(nature => nature.nomNature === pokemon.naturePokedex);
            if (nature) {
              this.natureService.getNatureById(pokemon.naturePokedex.idNature).subscribe({
                next: (nature) => pokemon.naturePokedex = nature,
                error: (err) => console.error('Erreur de récupération de la nature:', err)
              });
            }
          }

          if (typeof pokemon.pokeballPokedex === 'string') {
            const pokeball = this.pokeballs.find(pokeball => pokeball.nomPokeball === pokemon.pokeballPokedex);
            if (pokeball) {
              this.pokeballService.getPokeballById(pokemon.pokeballPokedex.id).subscribe({
                next: (pokeball) => pokemon.pokeballPokedex = pokeball,
                error: (err) => console.error('Erreur de récupération de la Pokéball:', err)
              });
            }
          }

          if (typeof pokemon.region === 'string') {
            this.regionService.getRegionById(pokemon.region.id).subscribe({
              next: (region) => pokemon.region = region,
              error: (err) => console.error('Erreur de récupération de la région:', err)
            });
          }

          if (typeof pokemon.boitePokedex === 'string') {
            this.boitePokedexService.getBoitePokedexById(pokemon.boitePokedex.id).subscribe({
              next: (boite) => pokemon.boitePokedex = boite,
              error: (err) => console.error('Erreur de récupération de la boîte:', err)
            });
          }
        });
  
        this.updatePage(); // Met à jour la page des Pokémon
      },
      error: (error) => console.error('Erreur lors du chargement des Pokémon:', error),
    });
  }
  
  getDatas(): void {
    this.dresseurService.getAllDresseurs().subscribe({
      next: (dresseur: Dresseur[]) => {
        this.dresseurs = dresseur; 
      },
      error: (error) => console.error('Erreur lors du chargement des dresseurs:', error),
    });
    
    this.regionService.getAllRegions().subscribe({
      next: (region: Regions[]) => {
        this.regions = region;
      },
      error: (error) => console.error('Erreur lors du chargement des régions:', error),
    });
    
    this.natureService.getAllNatures().subscribe({
      next: (nature: Nature[]) => {
        this.natures = nature;
      },
      error: (error) => console.error('Erreur lors du chargement des natures:', error),
    });
    
    this.pokeballService.getAllPokeballs().subscribe({
      next: (pokeball: Pokeball[]) => {
        this.pokeballs = pokeball;
      },
      error: (error) => console.error('Erreur lors du chargement des pokeballs:', error),
    });
  }

  // Méthode pour mettre à jour les Pokémon visibles selon la page actuelle
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.pokemonsPerPage;
    const endIndex = startIndex + this.pokemonsPerPage;
    this.pokemonsList = this.allPokemonsList.slice(startIndex, endIndex);
  }

  // Méthode pour changer la région en émettant un événement
  onRegionSelected(regionId: number): void {
    this.region = regionId;
    this.fetchPokemonsByRegion(regionId); // Rafraîchit les Pokémon pour la nouvelle région
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les Pokémon visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allPokemonsList.length / this.pokemonsPerPage) }, (_, i) => i + 1);
  }

  openPokemonModal(pokemon: PokedexRegions): void {
    // Copie sécurisée du Pokémon sélectionné pour l'affichage
    this.selectedPokemonForDisplay = { ...pokemon };
    
    // Copie complète pour la modification
    this.selectedPokemonForEdit = { ...pokemon } as unknown as PokedexNational;

    // Vérifie si une région est liée au Pokémon
    if (this.selectedPokemonForDisplay.region && this.selectedPokemonForDisplay.region.id) {
      this.selectedPokemonForDisplay.region = this.selectedPokemonForDisplay.region; // Assigne directement la région
      this.isModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Région invalide ou non définie pour ce Pokémon');
      this.isModalOpen = true;
    }
  }

  updatePokemon(): void {
    console.log('Pokemon sélectionné:', this.selectedPokemonForEdit);
    if (this.selectedPokemonForEdit) {

      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedPokemon: any = {
        id: this.selectedPokemonForEdit.id, // Remplacez id par numDex si nécessaire
      };
      
  
      // Log avant l'appel du service pour vérifier l'ID
      console.log('ID avant mise à jour:', updatedPokemon.id);  // Vérifie l'ID avant l'envoi
  
      // Ajout des champs seulement si modifiés
      if (this.selectedPokemonForEdit.dresseurPokedex?.id) {
        updatedPokemon.dresseurPokedex = { id: this.selectedPokemonForEdit.dresseurPokedex.id };
      }
      if (this.selectedPokemonForEdit.naturePokedex?.idNature) {
        updatedPokemon.naturePokedex = { id: this.selectedPokemonForEdit.naturePokedex.idNature };
      }
      if (this.selectedPokemonForEdit.pokeballPokedex?.id) {
        updatedPokemon.pokeballPokedex = { id: this.selectedPokemonForEdit.pokeballPokedex.id };
      }
      if (this.selectedPokemonForEdit.region?.id) {
        updatedPokemon.region = { id: this.selectedPokemonForEdit.region.id };
      }
  
      // Appel API pour mettre à jour seulement les champs modifiés
      this.pokedexService.updatePokemonInPokedex(updatedPokemon).subscribe({
        next: () => {
          // Rafraîchit la liste des Pokémon après la mise à jour
          this.fetchPokemonsByRegion(this.region);
          this.closeModal(); // Ferme le modal après mise à jour
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du Pokémon :', err);
          alert('Erreur lors de la mise à jour');
        }
      });
    } else {
      alert('Aucun Pokémon sélectionné pour la mise à jour.');
    }
  }
  
  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedPokemonForDisplay = null;
    this.selectedPokemonForEdit = null;
  }
}
