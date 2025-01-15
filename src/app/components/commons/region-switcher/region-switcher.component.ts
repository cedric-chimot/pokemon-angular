import { Component, OnChanges, Input, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PokedexNationalService } from "../../../services/pokedex-national/pokedex-national.service"; 
import { Observable } from "rxjs";
import { PokedexRegions } from "../../../models/tables/Pokedex-Regions"; 
import { CommonModule } from "@angular/common";
import { PokemonShiny } from "../../../models/tables/PokemonShiny";

@Component({
  selector: "app-region-switcher",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./region-switcher.component.html",
  styleUrls: ["./region-switcher.component.css"],
})
export class RegionSwitcherComponent implements OnChanges {
  @Input() pokedexList: PokedexRegions[] = [];
  @Input() pokemonList: PokemonShiny[] = [];
  @Output() regionSelected = new EventEmitter<number>();
  @Output() regionSelectedChanged = new EventEmitter<string>();

  regions: { id: number; nomRegion: string; className: string }[] = [];
  currentRegionId: number = 1;
  currentRegionName: string = "Kanto";

  // Observable pour stocker les Pokémon de la région courante
  pokemons$!: Observable<PokedexRegions[]>; 

  regionClasses = [
    { id: 1, nomRegion: "Kanto", className: "btn-kanto" },
    { id: 2, nomRegion: "Johto", className: "btn-johto" },
    { id: 3, nomRegion: "Hoenn", className: "btn-hoenn" },
    { id: 4, nomRegion: "Sinnoh", className: "btn-sinnoh" },
    { id: 5, nomRegion: "Unys", className: "btn-unys" },
    { id: 6, nomRegion: "Kalos", className: "btn-kalos" },
    { id: 7, nomRegion: "Alola", className: "btn-alola" },
    { id: 8, nomRegion: "Galar", className: "btn-galar" },
    { id: 9, nomRegion: "Hisui", className: "btn-hisui" },
    { id: 10, nomRegion: "Paldea", className: "btn-paldea" },
  ];

  constructor(private pokedexNationalService: PokedexNationalService) {}

  ngOnChanges(): void {
    this.getRegionsFromPokedex();
  }

  // Méthode permettant de créer une liste de régions en extrayant leurs identifiants à partir des entrées du pokédex
  // et en filtrant les régions disponibles
  getRegionsFromPokedex(): void {
    // Création d'un tableau vide pour y stocker les identifiants des régions
    const regionIdsFromPokedex: number[] = [];
    // On parcourt chaque élément (entry) de pokedexList
    for (const entry of this.pokedexList) {
      // Si l'entrée du pokédex a une région avec un identifiant valide, cet identifiant est ajouté au tableau regionIdsFromPokedex
      if (entry.region && entry.region.id) {
        regionIdsFromPokedex.push(entry.region.id);
      }
    }

    // On filtre les régions disponibles à partir des identifiants récupérés à partir du pokédex
    this.regions = this.regionClasses.filter(region => 
      regionIdsFromPokedex.includes(region.id)
    );
  }

  // Change la région et affiche les Pokémons de cette région
  switchRegion(nomRegion: string, id: number): void {
    // Émet l'événement avec le nouvel identifiant de région et le nom de la région courante
    this.regionSelected.emit(id);
    this.regionSelectedChanged.emit(nomRegion);

    // Mise à jour des informations de la région courante dans le composant
    this.currentRegionId = id;
    this.currentRegionName = nomRegion;
  
    // Appel au service avec gestion de l'abonnement
    this.pokemons$ = this.pokedexNationalService.getPokemonsByRegion(id);
    
    // Récupération des Pokémons de la région courante et affichage des informations dans la console
    this.pokemons$.subscribe({
      next: (pokemons: PokedexRegions[]) => {
        console.log(`Pokemons for region ${nomRegion}:`, pokemons);
      },
      error: (error) => {
        console.error("Error fetching Pokémon for region:", error);
      }
    });
  }
  
}
