import { Component, EventEmitter, Input, Output, OnChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokedexRegions } from '../../../../models/tables/Pokedex-Regions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-switcher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './region-switcher.component.html',
  styleUrls: ['./region-switcher.component.css'],
})
export class RegionSwitcherComponent implements OnChanges, AfterViewInit {
  @Input() pokedexList: PokedexRegions[] = []; // Liste des Pokémon à afficher
  @Output() regionSelected = new EventEmitter<string>(); // Émet la région sélectionnée

  regions: string[] = []; // Liste des régions dynamiques
  selectedRegion: string = ''; // Variable pour la région sélectionnée

  regionClasses: { [region: string]: string } = {
    kanto: 'btn-kanto',
    johto: 'btn-johto',
    hoenn: 'btn-hoenn',
    sinnoh: 'btn-sinnoh',
    unys: 'btn-unys',
    kalos: 'btn-kalos',
    alola: 'btn-alola',
    galar: 'btn-galar',
    hisui: 'btn-hisui',
    paldea: 'btn-paldea',
  };

  constructor(private cdRef: ChangeDetectorRef) {
    this.regions = [
      'kanto',
      'johto',
      'hoenn',
      'sinnoh',
      'unys',
      'kalos',
      'alola',
      'galar',
      'hisui',
      'paldea',
    ];
  }

  ngOnChanges(): void {
    if (this.pokedexList?.length) {
      // Appel de la fonction dès que le pokedexList change
      this.getRegionsFromPokedex();
    }
  }

  ngAfterViewInit(): void {
    // Utilisation de setTimeout pour laisser Angular gérer le cycle de détection de changement
    setTimeout(() => {
      if (this.pokedexList?.length) {
        this.getRegionsFromPokedex();
        // Utilisation de ChangeDetectorRef pour forcer la détection de changement
        this.cdRef.detectChanges();
      }
    }, 0);
  }

  // Extraire les régions uniques du Pokédex
  getRegionsFromPokedex(): void {
    const allRegions = this.pokedexList
      .map((entry) => entry.regions)
      .flat();

    this.regions = [...new Set(allRegions)];
  }

  // Récupérer la classe CSS associée à une région
  getRegionClass(region: string): string {
    return this.regionClasses[region] || 'btn-default';
  }

  // Méthode pour sélectionner une région
  selectRegion(region: string): void {
    if (this.selectedRegion === region) {
      this.selectedRegion = '';
      this.regionSelected.emit(''); // Désélectionner
    } else {
      this.selectedRegion = region;
      this.regionSelected.emit(region); // Sélectionner
    }
  }
}
