import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../commons/pagination/pagination/pagination.component';
import { RegionSwitcherComponent } from '../../../commons/region-switcher/region-switcher.component';
import { PokemonShiny } from '../../../../models/tables/PokemonShiny';
import { PokemonShinyService } from '../../../../services/pokemon-shiny/pokemon-shiny.service';
import { Dresseur } from '../../../../models/tables/Dresseur';
import { Nature } from '../../../../models/tables/Nature';
import { Pokeball } from '../../../../models/tables/PokeBall';
import { Regions } from '../../../../models/tables/Regions';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { NaturesService } from '../../../../services/natures/natures.service';
import { PokeballsService } from '../../../../services/pokeballs/pokeballs.service';
import { RegionsService } from '../../../../services/regions/regions.service';
import { SexesService } from '../../../../services/sexes/sexes.service';
import { Sexe } from '../../../../models/tables/Sexe';
import { Attaques } from '../../../../models/tables/Attaques';
import { ShinyAttaquesService } from '../../../../services/shinyAttaques/shiny-attaques.service';
import { ShinyAttaques } from '../../../../models/tables/ShinyAttaques';
import { Type } from '../../../../models/tables/Type';
import { TypesService } from '../../../../services/types/types.service';

@Component({
  selector: 'app-admin-pokemons-shiny',
  imports: [CommonModule, RouterModule, RegionSwitcherComponent, PaginationComponent, FormsModule],
  templateUrl: './admin-pokemons-shiny.component.html',
  styleUrls: ['./admin-pokemons-shiny.component.css']
})
export class AdminPokemonsShinyComponent {
  shinies: PokemonShiny[] = [];
  allShiniesList: any[] = [];
  shiniesList: any[] = [];
  shiniesPerPage: number = 5; 
  @Input() region: number = 1; 
  @Output() regionSelected = new EventEmitter<number>();
  currentPage: number = 1; 
  isModalOpen = false;

  selectedShinyForEdit: PokemonShiny | null = null;  // Pour la modification (modèle complet)

  // Données nécessaires pour le formulaire
  dresseurs: Dresseur[] = []; 
  regions: Regions[] = [];
  natures: Nature[] = [];
  pokeballs: Pokeball[] = [];
  types: Type[] = [];
  sexes: Sexe[] = [];
  attaques: Attaques[] = [];

  constructor(
    private shinyService: PokemonShinyService,
    private regionService: RegionsService,
    private dresseurService: DresseursService,
    private natureService: NaturesService,
    private pokeballService: PokeballsService,
    private sexeService: SexesService,
    private typeService: TypesService,
    private shinyAttaqueService: ShinyAttaquesService
  ) {}

  ngOnInit(): void {
    this.getDatas();
    this.fetchShiniesByRegion(this.region);
  }

  // Affichage de la liste des donnés des pokemons
  fetchShiniesByRegion(regionId: number): void {
    this.shinyService.getShinyPokemonsByRegion(regionId).subscribe({
      next: (pokemons: any[]) => {
        this.allShiniesList = pokemons;

        // On vérifie que la clé étrangère existe avant d'y accéder
        this.allShiniesList.forEach(pokemon => {
          if (typeof pokemon.dresseur === 'string') {
            const dresseur = this.dresseurs.find(dresseur => dresseur.nomDresseur === pokemon.dresseur);
            if (dresseur) {
              this.dresseurService.getDresseurById(pokemon.dresseur.id).subscribe({
                next: (dresseur) => pokemon.dresseur = dresseur,
                error: (err) => console.error('Erreur de récupération du dresseur:', err)
              });
            }
          }

          if (typeof pokemon.nature === 'string') {
            const natureId = this.natures.find(nature => nature.nomNature === pokemon.nature)?.id;
            if (natureId) {
              this.natureService.getNatureById(natureId).subscribe({
                next: (nature) => {
                  pokemon.nature = nature; 
                },
                error: (err) => console.error('Erreur de récupération de la nature:', err)
              });
            } else {
              console.warn(`Aucune nature trouvée pour le nom: ${pokemon.naturePokedex}`);
            }
          }
          
          if (typeof pokemon.pokeball === 'string') {
            const pokeball = this.pokeballs.find(pokeball => pokeball.nomPokeball === pokemon.pokeball);
            if (pokeball) {
              this.pokeballService.getPokeballById(pokemon.pokeball.id).subscribe({
                next: (pokeball) => pokemon.pokeball = pokeball,
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

          if (typeof pokemon.sexe === 'string') {
            const sexe = this.sexes.find(sexe => sexe.sexe === pokemon.sexe);
            if (sexe) {
              this.sexeService.getSexeById(pokemon.sexe.id).subscribe({
                next: (sexe) => pokemon.sexe = sexe,
                error: (err) => console.error('Erreur de récupération du sexe:', err)
              });
            }
          }

          this.shinyAttaqueService.getAttaquesByShinyId(pokemon.id).subscribe({
            next: (attaques: ShinyAttaques[]) => {
              // On associe directement le tableau d'attaques au Pokémon
              pokemon.attaques = attaques;
            },
            error: (err) => console.error('Erreur de récupération des attaques:', err)
          });
          
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
        this.natures = nature; // Vérifiez que chaque nature a bien un `idNature`
      },
      error: (error) => console.error('Erreur lors du chargement des natures:', error),
    });
    
    this.pokeballService.getAllPokeballsForPokedex().subscribe({
      next: (pokeball: Pokeball[]) => {
        this.pokeballs = pokeball;
      },
      error: (error) => console.error('Erreur lors du chargement des pokeballs:', error),
    });

    this.sexeService.getAllSexes().subscribe({
      next: (sexe: Sexe[]) => {
        this.sexes = sexe;
      },
      error: (error) => console.error('Erreur lors du chargement des sexes:', error),
    });

    // Transformation des attaques ShinyAttaques vers Attaques
    this.shinyAttaqueService.getAllShinyAttaques().subscribe({
      next: (attaque: ShinyAttaques[]) => {
        // Transformer les ShinyAttaques en Attaques
        this.attaques = attaque.flatMap(attaque => attaque.attaques);
      },
      error: (error) => console.error('Erreur lors du chargement des attaques:', error),
    });
  }

  // Méthode pour mettre à jour les Pokémon visibles selon la page actuelle
  updatePage(): void {
    const totalPages = Math.ceil(this.allShiniesList.length / this.shiniesPerPage);
    
    // Si la page actuelle dépasse le total, revenez à la dernière page disponible
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }
    
    const startIndex = (this.currentPage - 1) * this.shiniesPerPage;
    const endIndex = startIndex + this.shiniesPerPage;
    this.shiniesList = this.allShiniesList.slice(startIndex, endIndex);
  }
  
  // Méthode pour changer la région en émettant un événement
  onRegionSelected(regionId: number): void {
    if (this.region !== regionId) {
      // Changement de région, on revient à la page 1
      this.currentPage = 1;
    }
    
    this.region = regionId;
    this.fetchShiniesByRegion(regionId); // Rafraîchit les Pokémon pour la nouvelle région
  }

  // Méthode pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(); // Met à jour les Pokémon visibles
  }

  // Méthode pour générer les numéros de page
  get pageNumbers() {
    return Array.from({ length: Math.ceil(this.allShiniesList.length / this.shiniesPerPage) }, (_, i) => i + 1);
  }

  // Méthode pour ouvrir le modal
  openPokemonModal(shiny: PokemonShiny): void {    
    // Copie complète pour la modification
    this.selectedShinyForEdit = { ...shiny } as unknown as PokemonShiny;

    // Vérifie si une région est liée au Pokémon
    if (this.selectedShinyForEdit.regionShiny && this.selectedShinyForEdit.regionShiny.id) {
      this.selectedShinyForEdit.regionShiny = this.selectedShinyForEdit.regionShiny; // Assigne directement la région
      this.isModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Région invalide ou non définie pour ce Pokémon');
      this.isModalOpen = true;
    }
  }
  
  // Méthode pour mettre à jour un pokémon
  updatePokemon(): void {
    console.log('Pokemon sélectionné:', this.selectedShinyForEdit);
  
    if (this.selectedShinyForEdit) {
      // Mise à jour de l'objet Pokémon Shiny avec les attaques associées
      const updatedPokemon: any = {
        id: this.selectedShinyForEdit.id,
        numDex: this.selectedShinyForEdit.numDex,
        nomPokemon: this.selectedShinyForEdit.nomPokemon,
        nature: this.selectedShinyForEdit.nature,
        dresseur: { id: this.selectedShinyForEdit.dresseur.id },
        pokeball: { id: this.selectedShinyForEdit.pokeball.id },
        type1: this.selectedShinyForEdit.type1,
        type2: this.selectedShinyForEdit.type2,
        sexe: this.selectedShinyForEdit.sexe,
        attaques: this.selectedShinyForEdit.attaques,
        boite: this.selectedShinyForEdit.boite,
        region: { id: this.selectedShinyForEdit.regionShiny.id },
        ivManquant: this.selectedShinyForEdit.ivManquant
      };
  
      // Appel à l'API pour mettre à jour le Pokémon
      this.shinyService.updatePokemonShiny(updatedPokemon).subscribe({
        next: (response) => {
          console.log('Pokémon mis à jour', response);
          this.fetchShiniesByRegion(this.region); // Rafraîchit la liste des Pokémon
          this.isModalOpen = false;  // Ferme le modal après la mise à jour
        },
        error: (err) => console.error('Erreur lors de la mise à jour du Pokémon:', err)
      });
    }
  }
  
  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    // this.selectedPokemonForDisplay = null;
    this.selectedShinyForEdit = null;
  }

  // Supprimer un pokémon par son ID
  deletePokemon(id: number): void {
    this.shinyService.deletePokemonShinyById(id).subscribe({
      next: () => {
        this.fetchShiniesByRegion(this.region);  // Recharger la liste après suppression
      },
      error: (err) => console.error('Erreur lors de la suppression de l\'attaque:', err)
    });
  }
  
  filterUniqueAttacks() {
    // Crée un Set pour filtrer les attaques par leur ID (cela garantira qu'elles sont uniques)
    const uniqueAttacks = new Set();
    return this.attaques.filter(attaque => {
        if (!uniqueAttacks.has(attaque.id)) {
            uniqueAttacks.add(attaque.id);
            return true; // Inclure cette attaque
        }
        return false; // Exclure les attaques dupliquées
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

  // Retourner un symbole correspondant au sexe en BDD
  getSexeSymbol(sexe: string): string {
    switch (sexe) {
      case 'Mâle ♂':
        return '♂';
      case 'Femelle ♀':
        return '♀';
      case 'Assexué Ø':
        return 'Ø';
      default:
        return ''; 
    }
  }
  
  // Retourner une couleur correspondant au sexe en BDD
  getSexeColor(sexe: string): string {
    switch (sexe) {
      case 'Mâle ♂':
        return '#87ceeb';
      case 'Femelle ♀':
        return '#dda0dd';
      case 'Assexué Ø':
        return '#6a5acd';
      default:
        return '#000000';
    }
  }

  getRowspanForDex(pokemonGroup: PokemonShiny[], pokemon: PokemonShiny): number {
    return pokemonGroup.filter(p => p.numDex === pokemon.numDex).length;
  }
      
}
  