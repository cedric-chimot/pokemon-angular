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
import { Type } from '../../../../models/tables/Type';
import { AttaquesService } from '../../../../services/attaques/attaques.service';
import { ColorsService } from '../../../../services/colors/colors.service';
import { Boites } from '../../../../models/stats/Boites';
import { BoitesShinyService } from '../../../../services/boites-shiny/boites-shiny.service';

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
  isDeleteModalOpen = false;
  attaqueColors: { [key: string]: string | undefined } = {};
  columnTextColors: string[] = [
    '#191973',
    '#87ceeb',
    '#e3c035',
    '#e94152',
    '#c71585',
    '#f58adc'
  ];
  selectedShinyForEdit: PokemonShiny | null = null;
  selectedShinyForDelete: PokemonShiny | null = null;

  // Données nécessaires pour le formulaire
  dresseurs: Dresseur[] = [];
  regions: Regions[] = [];
  natures: Nature[] = [];
  pokeballs: Pokeball[] = [];
  types: Type[] = [];
  sexes: Sexe[] = [];
  attaques: Attaques[] = [];
  boites: Boites[] = [];

  constructor(
    private shinyService: PokemonShinyService,
    private regionService: RegionsService,
    private dresseurService: DresseursService,
    private natureService: NaturesService,
    private pokeballService: PokeballsService,
    private sexeService: SexesService,
    private attaqueService: AttaquesService,
    private colorService: ColorsService,
    private boiteShinyService: BoitesShinyService
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

          if (typeof pokemon.boite === 'string') {
            const boites = this.boites.find(boites => boites.nom === pokemon.boite);
            if (boites) {
              this.boiteShinyService.getBoiteById(pokemon.boiteShiny.id).subscribe({
                next: (boiteShiny) => pokemon.boiteShiny = boiteShiny,
                error: (err) => console.error('Erreur de récupération de la boite:', err)
              });
            }
          }

          this.attaqueService.getAttaqueById(pokemon.id).subscribe({
            next: (attaques: Attaques) => {
              // On associe directement le tableau d'attaques au Pokémon
              pokemon.attaques = attaques;
            },
            error: (err) => console.error('Erreur de récupération des attaques:', err)
          });

        });

        this.updateShiniesList(); // Met à jour la page des Pokémon
      },
      error: (error) => console.error('Erreur lors du chargement des Pokémon:', error),
    });
  }

  // Méthode pour obtenir toutes les données des shiny
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

    this.attaqueService.getAllAttaques().subscribe({
      next: (attaque: Attaques[]) => {
          this.attaques = attaque;
      },
      error: (error) => console.error('Erreur lors du chargement des attaques:', error),
    });

    this.boiteShinyService.getAllBoites().subscribe({
      next: (boite: Boites[]) => {
          this.boites = boite;
      },
      error: (error) => console.error('Erreur lors du chargement des boites:', error),
    });
  }

  // Méthode pour mettre à jour les Pokémon visibles selon la page actuelle
  updateShiniesList(): void {
    const startIndex = (this.currentPage - 1) * this.shiniesPerPage;
    const endIndex = startIndex + this.shiniesPerPage;
    this.shiniesList = this.allShiniesList.slice(startIndex, endIndex);

    this.getAttackType(); // Applique les couleurs uniquement aux shinies affichés
  }

  // Méthode pour obtenir la couleur à donner à une attaque selon son type
  private getAttackType(): void {
    this.shiniesList.forEach((pokemon) => {
      const attaques = [
        pokemon.attaque1,
        pokemon.attaque2,
        pokemon.attaque3,
        pokemon.attaque4
      ].filter(Boolean); // Filtre les attaques nulles ou undefined

      attaques.forEach((attaque) => {
        if (!this.attaqueColors[attaque.nomAttaque]) {
          this.attaqueService.getColorForAttaque(attaque).subscribe({
            next: (couleur) => {
              this.attaqueColors[attaque.nomAttaque] = couleur ?? '#000000'; // Couleur par défaut si null
            },
            error: (error) => {
              console.error('Erreur lors de la récupération de la couleur pour', attaque.nomAttaque, error);
            }
          });
        }
      });
    });
  }

  // Fonction pour obtenir la couleur d'un type
  getTypeColor(type: string): string {
    return this.colorService.getTypeColor(type) || '#000000';
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
  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.updateShiniesList();
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
      this.selectedShinyForEdit.regionShiny = this.selectedShinyForEdit.regionShiny;
      this.isModalOpen = true; // Ouvre le modal après avoir récupéré les détails
    } else {
      console.error('Région invalide ou non définie pour ce Pokémon');
      this.isModalOpen = true;
    }
  }

  // Méthode pour ouvrir le modal de suppression
  openDeleteModal(pokemon: PokemonShiny): void {
    this.selectedShinyForDelete = { ...pokemon } as unknown as PokemonShiny;  // Copie complète pour la suppression
    this.isDeleteModalOpen = true;  // Ouvre le modal de suppression
  }

  // Méthode pour mettre à jour un shiny
  updatePokemon(): void {
    if (this.selectedShinyForEdit) {
      // Mise à jour de l'objet Pokémon Shiny
      const updatedPokemon: any = {
        id: this.selectedShinyForEdit.id,
        numDex: this.selectedShinyForEdit.numDex,
        nomPokemon: this.selectedShinyForEdit.nomPokemon,
        nature: this.selectedShinyForEdit.nature,
        dresseur: { id: this.selectedShinyForEdit.dresseur.id },
        pokeball: { id: this.selectedShinyForEdit.pokeball.id },
        ivManquant: this.selectedShinyForEdit.ivManquant,
        type1: this.selectedShinyForEdit.type1,
        type2: this.selectedShinyForEdit.type2,
        sexe: this.selectedShinyForEdit.sexe,
        attaque1: {id: this.selectedShinyForEdit.attaque1.id},
        attaque2: {id: this.selectedShinyForEdit.attaque2.id},
        attaque3: {id: this.selectedShinyForEdit.attaque3.id},
        attaque4: {id: this.selectedShinyForEdit.attaque4.id},
        boite: this.selectedShinyForEdit.boite,
        position: this.selectedShinyForEdit.position,
        region: this.selectedShinyForEdit.regionShiny ? { id: this.selectedShinyForEdit.regionShiny.id } : null // Vérification de null ou undefined pour regionShiny
      };
      console.log(this.selectedShinyForEdit.boite);  // Vérifie ce qui est affiché

      // Mise à jour du Pokémon via l'API
      this.shinyService.updatePokemonShiny(updatedPokemon).subscribe({
        next: (response) => {
          console.log('Pokémon mis à jour', response);

          // Rafraîchir la liste des Pokémon après la mise à jour
          this.fetchShiniesByRegion(this.region);

          // Fermer le modal après la mise à jour
          this.isModalOpen = false;
        },
        error: (err) => console.error('Erreur lors de la mise à jour du Pokémon:', err)
      });
    }
  }

  // Méthode pour supprimer le Pokémon après confirmation
  confirmDeleteShiny(): void {
    if (this.selectedShinyForDelete && this.selectedShinyForDelete.id) {
      this.shinyService.deletePokemonShinyById(this.selectedShinyForDelete.id).subscribe({
        next: () => {
          this.fetchShiniesByRegion(this.region);  // Recharger la liste après suppression
          this.closeModal();  // Fermer le modal après la suppression
        },
        error: (err) => console.error('Erreur lors de la suppression du Pokémon:', err)
      });
    } else {
      console.error('Aucun Pokémon sélectionné pour suppression');
    }
  }

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedShinyForEdit = null;
    this.isDeleteModalOpen = false;
    this.selectedShinyForDelete = null;
  }

  // Créer un Set pour filtrer les attaques par leur ID (cela garantira qu'elles sont uniques)
  filterUniqueAttacks() {
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
  getRegionName(): string {
    const selectedRegion = this.regions.find(region => region.id === this.region);
    return selectedRegion ? selectedRegion.nomRegion : 'Unknown région';
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

  // Appliquer un rawspan sur les shiny aux numDex identiques
  getRowspanForDex(pokemonGroup: PokemonShiny[], pokemon: PokemonShiny): number {
    return pokemonGroup.filter(p => p.numDex === pokemon.numDex).length;
  }

}
