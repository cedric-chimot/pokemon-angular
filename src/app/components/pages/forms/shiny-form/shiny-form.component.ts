import { Boite } from './../../../../models/stats/Boites';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Dresseur } from '../../../../models/tables/Dresseur';
import { Nature } from '../../../../models/tables/Nature';
import { Pokeball } from '../../../../models/tables/PokeBall';
import { Regions } from '../../../../models/tables/Regions';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { NaturesService } from '../../../../services/natures/natures.service';
import { PokeballsService } from '../../../../services/pokeballs/pokeballs.service';
import { RegionsService } from '../../../../services/regions/regions.service';
import { PokemonShiny } from '../../../../models/tables/PokemonShiny';
import { Type } from '../../../../models/tables/Type';
import { Sexe } from '../../../../models/tables/Sexe';
import { Attaques } from '../../../../models/tables/Attaques';
import { TypesService } from '../../../../services/types/types.service';
import { AttaquesService } from '../../../../services/attaques/attaques.service';
import { PokemonShinyService } from '../../../../services/pokemon-shiny/pokemon-shiny.service';
import { SexesService } from '../../../../services/sexes/sexes.service';
import { BoitesShinyService } from '../../../../services/boites-shiny/boites-shiny.service';

@Component({
  selector: 'app-shiny-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './shiny-form.component.html',
  styleUrls: ['./shiny-form.component.css']
})
export class ShinyFormComponent {
  shiny: Partial<PokemonShiny> = {
    numDex: '',
    nomPokemon: '',
    nature: {} as Nature,
    dresseur: {} as Dresseur,
    pokeball: {} as Pokeball,
    ivManquant: '',
    type1: {} as Type,
    type2: {} as Type,
    sexe: {} as Sexe,
    attaque1: {} as Attaques,
    attaque2: {} as Attaques,
    attaque3: {} as Attaques,
    attaque4: {} as Attaques,
    boite: {} as Boite,
    position: 0,
    regionShiny: {} as Regions
  };
  dresseurs: Dresseur[] = [];
  natures: Nature[] = [];
  pokeballs: Pokeball[] = [];
  types: Type[] = [];
  regions: Regions[] = [];
  sexes: Sexe[] = [];
  attaques: Attaques[] = [];
  boites: Boite[] = [];

  constructor(
    private shinyService: PokemonShinyService,
    private regionService: RegionsService,
    private dresseurService: DresseursService,
    private natureService: NaturesService,
    private pokeballService: PokeballsService,
    private typeService: TypesService,
    private attaqueService: AttaquesService,
    private sexeService: SexesService,
    private boiteShinyService: BoitesShinyService
  ) {}

  // Charger toutes les données lors du chargement de la page
  ngOnInit(): void {
    this.getDatas();
  }

  // Méthode pour enregistrer un nouveau pokémon shiny
  onSubmit(): void {
    if (
        this.shiny.numDex &&
        this.shiny.nomPokemon &&
        this.shiny.nature &&
        this.shiny.dresseur &&
        this.shiny.pokeball &&
        this.shiny.ivManquant &&
        this.shiny.type1 &&
        (this.shiny.type2 || this.shiny.type2 === null) &&
        this.shiny.sexe &&
        this.shiny.attaque1 &&
        this.shiny.attaque2 &&
        this.shiny.attaque3 &&
        this.shiny.attaque4 &&
        this.shiny.boite &&
        this.shiny.position &&
        this.shiny.regionShiny) {

      const newShiny: PokemonShiny = {
        id: 0, // L'ID sera généré par le backend
        numDex: this.shiny.numDex!,
        nomPokemon: this.shiny.nomPokemon!,
        nature: this.natures.find(
          (nature) => nature.id === this.shiny.nature!.id
        )!,
        dresseur: this.dresseurs.find(
          (dresseur) => dresseur.id === this.shiny.dresseur!.id
        )!,
        pokeball: this.pokeballs.find(
          (pokeball) => pokeball.id === this.shiny.pokeball!.id
        )!,
        sexe: this.sexes.find(
          (sexe) => sexe.id === this.shiny.sexe!.id
        )!,
        type1: this.types.find(
          (type) => type.id === this.shiny.type1!.id
        )!,
        type2: this.shiny.type2 ? this.types.find(
          (type) => type.id === this.shiny.type2!.id
        )! : null,
        attaque1: this.attaques.find(
          (attaque) => attaque.id === this.shiny.attaque1!.id
        )!,
        attaque2: this.attaques.find(
          (attaque) => attaque.id === this.shiny.attaque2!.id
        )!,
        attaque3: this.attaques.find(
          (attaque) => attaque.id === this.shiny.attaque3!.id
        )!,
        attaque4: this.attaques.find(
          (attaque) => attaque.id === this.shiny.attaque4!.id
        )!,
        ivManquant: this.shiny.ivManquant!,
        boite: this.boites.find(
          (boite) => boite.id === this.shiny.boite!.id
        )!,
        position: this.shiny.position!,
        regionShiny: this.regions.find(
          (region) => region.id === this.shiny.regionShiny!.id
        )!
      };

      this.shinyService.createShiny(newShiny).subscribe({
        next: (data) => {
          console.log('Pokémon ajouté avec succès:', data);
          alert('Pokémon ajouté !');
          // Réinitialisation du formulaire
          this.shiny = { numDex: '', nomPokemon: '', nature: {} as Nature, dresseur: {} as Dresseur,
            pokeball: {} as Pokeball, sexe: {} as Sexe,type1: {} as Type, type2: {} as Type, attaque1: {} as Attaques,
            attaque2: {} as Attaques, attaque3: {} as Attaques, attaque4: {} as Attaques, ivManquant: '',
            boite: {} as Boite, position: 0, regionShiny: {} as Regions };
        },
        error: (err) =>
          alert('Erreur lors de l’ajout du shiny' + err),
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  // Méthode pour récupérer toutes les données associées au pokémons shiny
  getDatas(): void {
    this.dresseurService.getDresseurs().subscribe({
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

    this.pokeballService.getAllPokeballsForAdmin().subscribe({
      next: (pokeball: Pokeball[]) => {
        this.pokeballs = pokeball;
      },
      error: (error) => console.error('Erreur lors du chargement des pokeballs:', error),
    });

    this.typeService.getAllTypes().subscribe({
      next: (type: Type[]) => {
        this.types = type;
      },
      error: (error) => console.error('Erreur lors du chargement des types:', error),
    });

    this.attaqueService.getAllAttaques().subscribe({
      next: (attaque: Attaques[]) => {
        this.attaques = attaque;
      },
      error: (error) => console.error('Erreur lors du chargement des attaques:', error),
    });

    this.sexeService.getAllSexes().subscribe({
      next: (sexe: Sexe[]) => {
        this.sexes = sexe;
      },
      error: (error) => console.error('Erreur lors du chargement des sexes:', error),
    });

    this.boiteShinyService.getAllBoites().subscribe({
      next: (boite: Boite[]) => {
        this.boites = boite;
      },
      error: (error) => console.error('Erreur lors du chargement des sexes:', error),
    });

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

}
