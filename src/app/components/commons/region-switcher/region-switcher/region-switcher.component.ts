import { Component, OnChanges, Input, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PokedexNationalService } from "../../../../services/pokedex-national/pokedex-national.service"; 
import { Observable } from "rxjs";
import { PokedexRegions } from "../../../../models/tables/Pokedex-Regions"; 
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-region-switcher",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./region-switcher.component.html",
  styleUrls: ["./region-switcher.component.css"],
})
export class RegionSwitcherComponent implements OnChanges {
  @Input() pokedexList: PokedexRegions[] = [];
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

  // Récupère les régions du Pokédex et les filtre pour ne garder que celles qui sont présentes dans la liste des Pokémons du composant
  getRegionsFromPokedex(): void {
    const regionIdsFromPokedex: number[] = [];
    for (const entry of this.pokedexList) {
      if (entry.region && entry.region.id) {
        regionIdsFromPokedex.push(entry.region.id);
      }
    }

    this.regions = this.regionClasses.filter(region => 
      regionIdsFromPokedex.includes(region.id)
    );
  }

  // Change la région et affiche les Pokémons de cette région
  switchRegion(nomRegion: string, id: number): void {
    this.regionSelected.emit(id);
    this.regionSelectedChanged.emit(nomRegion);
    this.currentRegionId = id;
    this.currentRegionName = nomRegion;
  
    // Appel au service avec gestion de l'abonnement
    this.pokemons$ = this.pokedexNationalService.getPokemonsByRegion(id);
    
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
