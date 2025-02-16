import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokedexNational } from '../../../../models/tables/PokedexNational';
import { BoitesPokedex } from '../../../../models/tables/BoitesPokedex';
import { Dresseur } from '../../../../models/tables/Dresseur';
import { Nature } from '../../../../models/tables/Nature';
import { Pokeball } from '../../../../models/tables/PokeBall';
import { Regions } from '../../../../models/tables/Regions';
import { BoitesPokedexService } from '../../../../services/boites-pokedex/boites-pokedex.service';
import { DresseursService } from '../../../../services/dresseurs/dresseurs.service';
import { NaturesService } from '../../../../services/natures/natures.service';
import { PokeballsService } from '../../../../services/pokeballs/pokeballs.service';
import { PokedexNationalService } from '../../../../services/pokedex-national/pokedex-national.service';
import { RegionsService } from '../../../../services/regions/regions.service';

@Component({
  selector: 'app-pokedex-form',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pokedex-form.component.html',
  styleUrls: ['./pokedex-form.component.css']
})
export class PokedexFormComponent {
  pokemon: Partial<PokedexNational> = {
    numDex: '',
    nomPokemon: '',
    naturePokedex: {} as Nature,
    dresseurPokedex: {} as Dresseur,
    pokeballPokedex: {} as Pokeball,
    boitePokedex: {} as BoitesPokedex,
    region: {} as Regions
  };
  dresseurs: Dresseur[] = [];
  natures: Nature[] = [];
  pokeballs: Pokeball[] = [];
  boites: BoitesPokedex[] = [];
  regions: Regions[] = [];
  isModalOpen = true;

  @Output() close = new EventEmitter<void>();

  constructor(
    private pokedexService: PokedexNationalService,
      private regionService: RegionsService,
      private dresseurService: DresseursService,
      private natureService: NaturesService,
      private pokeballService: PokeballsService,
      private boitePokedexService: BoitesPokedexService
  ) {}

  // Charger toutes les données lors du chargement de la page
  ngOnInit(): void {
    this.getDatas();
  }

  // Méthode pour enregistrer un nouveau pokémon dans le pokédex
  onSubmit(): void {
    if (this.pokemon.nomPokemon && this.pokemon.naturePokedex && this.pokemon.dresseurPokedex && this.pokemon.pokeballPokedex && this.pokemon.boitePokedex) {
      const newPokemon: PokedexNational = {
        id: 0, // L'ID sera généré par le backend
        numDex: this.pokemon.numDex!,
        nomPokemon: this.pokemon.nomPokemon!,
        naturePokedex: this.natures.find(
          (nature) => nature.id === this.pokemon.naturePokedex!.id
        )!,
        dresseurPokedex: this.dresseurs.find(
          (dresseur) => dresseur.id === this.pokemon.dresseurPokedex!.id
        )!,
        pokeballPokedex: this.pokeballs.find(
          (pokeball) => pokeball.id === this.pokemon.pokeballPokedex!.id
        )!,
        boitePokedex: this.boites.find(
          (boite) => boite.id === this.pokemon.boitePokedex!.id
        )!,
        region: this.regions.find(
          (region) => region.id === this.pokemon.region!.id
        )!
      };

      this.pokedexService.createPokemonInPokedex(newPokemon).subscribe({
        next: (data) => {
          console.log('Pokémon ajouté avec succès:', data);
          alert('Pokémon ajouté !');
          // Réinitialisation du formulaire
          this.pokemon = { numDex: '', nomPokemon: '', dresseurPokedex: {} as Dresseur, naturePokedex: {} as Nature,
            pokeballPokedex: {} as Pokeball, boitePokedex: {} as BoitesPokedex, region: {} as Regions };
        },
        error: (err) =>
          alert('Erreur lors de l’ajout du pokémon' + err),
      });
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

  // Méthode pour récupérer toutes les données associées au pokédex national
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

    this.pokeballService.getAllPokeballsForAdmin().subscribe({
      next: (pokeball: Pokeball[]) => {
        this.pokeballs = pokeball;
      },
      error: (error) => console.error('Erreur lors du chargement des pokeballs:', error),
    });

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
