import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { BoitesPokedex } from '../../../../models/tables/BoitesPokedex';

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
  pokemonsPerPage: number = 10; 
  @Input() region: number = 1; 
  @Output() regionSelected = new EventEmitter<number>();
  currentPage: number = 1; 
  isModalOpen = false;

  selectedPokemonForEdit: PokedexNational | null = null;  // Pour la modification (modèle complet)

  // Données nécessaires pour le formulaire
  dresseurs: Dresseur[] = []; 
  regions: Regions[] = [];
  natures: Nature[] = [];
  pokeballs: Pokeball[] = [];
  boites: BoitesPokedex[] = [];

  constructor(
    private pokedexService: PokedexNationalService,
    private regionService: RegionsService,
    private dresseurService: DresseursService,
    private natureService: NaturesService,
    private pokeballService: PokeballsService,
    private boitePokedexService: BoitesPokedexService
  ) {}

  ngOnInit(): void {
    this.getDatas();
    this.fetchPokemonsByRegion(this.region);
  }

  // Affichage de la liste des donnés des pokemons
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
            const natureId = this.natures.find(nature => nature.nomNature === pokemon.naturePokedex)?.id;
            if (natureId) {
              this.natureService.getNatureById(natureId).subscribe({
                next: (nature) => {
                  pokemon.naturePokedex = nature; // Assurez-vous que cette ligne met bien à jour `naturePokedex`
                  console.log(`Nature mise à jour pour le Pokémon ${pokemon.nom}:`, nature);
                },
                error: (err) => console.error('Erreur de récupération de la nature:', err)
              });
            } else {
              console.warn(`Aucune nature trouvée pour le nom: ${pokemon.naturePokedex}`);
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
  
  // Récupération des données
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
        console.log('Natures chargées :', this.natures); // Vérifiez que chaque nature a bien un `idNature`
      },
      error: (error) => console.error('Erreur lors du chargement des natures:', error),
    });
    
    this.pokeballService.getAllPokeballsForPokedex().subscribe({
      next: (pokeball: Pokeball[]) => {
        this.pokeballs = pokeball;
      },
      error: (error) => console.error('Erreur lors du chargement des pokeballs:', error),
    });
  }

  // Méthode pour mettre à jour les Pokémon visibles selon la page actuelle
  updatePage(): void {
    const totalPages = Math.ceil(this.allPokemonsList.length / this.pokemonsPerPage);
    
    // Si la page actuelle dépasse le total, revenir à la dernière page disponible
    if (this.currentPage > totalPages) {
      this.currentPage = 1;
    }
    
    const startIndex = (this.currentPage - 1) * this.pokemonsPerPage;
    const endIndex = startIndex + this.pokemonsPerPage;
    this.pokemonsList = this.allPokemonsList.slice(startIndex, endIndex);
  }
  
  // Méthode pour changer la région en émettant un événement
  onRegionSelected(regionId: number): void {
    if (this.region !== regionId) {
      // Changement de région, on revient à la page 1
      this.currentPage = 1;
    }
    
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

  // Méthode pour ouvrir le modal
  openPokemonModal(pokemon: PokedexRegions): void {    
    // Copie complète pour la modification
    this.selectedPokemonForEdit = { ...pokemon } as unknown as PokedexNational;

    // Vérifie si une région est liée au Pokémon
    if (this.selectedPokemonForEdit.region && this.selectedPokemonForEdit.region.id) {
      this.selectedPokemonForEdit.region = this.selectedPokemonForEdit.region; // Assigne directement la région
      this.isModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Région invalide ou non définie pour ce Pokémon');
      this.isModalOpen = true;
    }
  }

  // Méthode pour mettre à jour un pokémon
  updatePokemon(): void {
    if (this.selectedPokemonForEdit) {
      // Création d'un objet qui ne contiendra que les champs modifiés
      const updatedPokemon: any = {
        id: this.selectedPokemonForEdit.id,
        nom: this.selectedPokemonForEdit.nomPokemon,
        naturePokedex: this.selectedPokemonForEdit.naturePokedex,
        dresseurPokedex: { id: this.selectedPokemonForEdit.dresseurPokedex.id },
        pokeballPokedex: { id: this.selectedPokemonForEdit.pokeballPokedex.id },
        boitePokedex: { id: this.selectedPokemonForEdit.boitePokedex.id },
        region: { id: this.selectedPokemonForEdit.region.id },
      };
    
      this.pokedexService.updatePokemonInPokedex(updatedPokemon).subscribe({
        next: () => {
          this.fetchPokemonsByRegion(this.region); // Rafraîchit les données après mise à jour
          this.isModalOpen = false; // Ferme le modal
        },
        error: (err) => console.error('Erreur lors de la mise à jour du Pokémon :', err),
      });
    }
  }
  
  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    // this.selectedPokemonForDisplay = null;
    this.selectedPokemonForEdit = null;
  }

  // Supprimer un pokémon par son ID
  deletePokemon(id: number): void {
    this.pokedexService.deletePokemonInPokedexById(id).subscribe({
      next: () => {
        this.fetchPokemonsByRegion(this.region);  // Recharger la liste après suppression
      },
      error: (err) => console.error('Erreur lors de la suppression de l\'attaque:', err)
    });
  }
  
  // Méthode pour récupérer le nom de la région par son ID
  getRegionNameById(regionId: number): string {
    const regionNames: { [id: number]: string } = {
      1: 'Kanto',
      2: 'Johto',
      3: 'Hoenn',
      4: 'Sinnoh',
      5: 'Unys',
      6: 'Kalos',
      7: 'Alola',
      8: 'Galar',
      9: 'Hisui',
      10: 'Paldea',
    };
    return regionNames[regionId] || 'Unknown Region';
  }

  // Appliquer un rawspan sur les pokémons aux numDex identiques
  getRowspanForDex(pokemonGroup: PokedexNational[], pokemon: PokedexRegions): number {
    return pokemonGroup.filter(p => p.numDex === pokemon.numDex).length;
  }
  
  // Appliquer un rawspan sur les pokémons aux noms identiques
  getRowspanForPokemon(pokemonGroup: PokedexNational[], pokemon: PokedexRegions): number {
    return pokemonGroup.filter(p => p.nomPokemon === pokemon.nomPokemon).length;
  }
  
}
