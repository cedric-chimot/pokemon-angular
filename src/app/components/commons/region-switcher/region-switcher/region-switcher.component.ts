import { CommonModule } from "@angular/common";
import { Component, OnChanges, Input, EventEmitter, Output } from "@angular/core";
import { PokedexRegions } from "../../../../models/tables/Pokedex-Regions";
import { Regions } from "../../../../models/tables/Regions";
import { Router, RouterModule } from '@angular/router';  // Importation du Router

@Component({
  selector: 'app-region-switcher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './region-switcher.component.html',
  styleUrls: ['./region-switcher.component.css'],
})
export class RegionSwitcherComponent implements OnChanges {
  @Input() pokedexList: PokedexRegions[] = [];
  @Output() regionSelected = new EventEmitter<number>();
  regions: Regions[] = [];
  selectedRegionId: number = 1; // Région par défaut (ex: Kanto)

  regionClasses: { [region: string]: string } = {
    Kanto: 'btn-kanto',
    Johto: 'btn-johto',
    Hoenn: 'btn-hoenn',
    Sinnoh: 'btn-sinnoh',
    Unys: 'btn-unys',
    Kalos: 'btn-kalos',
    Alola: 'btn-alola',
    Galar: 'btn-galar',
    Hisui: 'btn-hisui',
    Paldea: 'btn-paldea',
  };

  constructor(private router: Router) {}  // Injection du Router

  ngOnChanges(): void {
    this.getRegionsFromPokedex();
  }

  getRegionsFromPokedex(): void {
    const uniqueRegionIds = [...new Set(this.pokedexList.map(entry => entry.region.id))];
    this.regions = uniqueRegionIds.map(id => ({
      id,
      nomRegion: this.getRegionNameById(id),
    }));
  }

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

  getRegionClass(region: Regions): string {
    return this.regionClasses[region.nomRegion] || 'btn-default';
  }

  // Remplacer l'événement de sélection de région par une navigation via Router
  navigateToRegion(region: Regions): void {
    this.router.navigate([`/pokedex/${region.id}`]);  // Route dynamique vers le Pokedex de la région
  }
}
