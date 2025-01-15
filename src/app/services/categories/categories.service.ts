import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesPokedex = [ 
    {
      id: 1,
      nomCategorie: 'Dresseurs',
      title: 'Pokemon par dresseurs d\'origine -  1G/6G',
      title1: 'Pokemon par dresseurs d\'origine -  Alola/Galar/Hisui',
      title2: 'Pokemon par dresseurs d\'origine -  Paldea',
      className: 'btn-dresseurs',
      columns: [
        { header: 'N° ID', property: 'numDresseur' },
        { header: 'Nom du Do', property: 'nomDresseur' },
        { header: 'Nb Pokemon', property: 'nbPokemon' }
      ],
      hasGraph: false,
      dataKey: 'dresseursRegion1Part1',
      dataKey1: 'dresseursRegion1Part2', 
      dataKey2: 'dresseursRegion2', 
      dataKey3: 'dresseursRegion3' 
    },
    {
      id: 2,
      nomCategorie: 'Pokeballs',
      title: 'Pokeballs utilisées',
      chartTitle: 'Nombre de pokemons par pokeballs',
      className: 'btn-pokeballs',
      columns: [
        { header: 'Types', property: 'nomPokeball' },
        { header: 'Nombre', property: 'nbPokemon' }
      ],
      hasGraph: true,
      dataKey: 'pokeballs'
    },
    {
      id: 3,
      nomCategorie: 'Natures',
      title: 'Natures',
      chartTitle: 'Répartition par natures',
      className: 'btn-natures',
      columns: [
        { header: 'Natures', property: 'nomNature' },
        { header: 'Nombre', property: 'nbPokemon' }
      ],
      hasGraph: true,
      dataKey: 'natures'
    },
    {
      id: 4,
      nomCategorie: 'Boites',
      title: 'Nombre de pokemons par genre/boites + level 100',
      chartTitle: 'Répartition par genres',
      chartComparaisonTitle: 'Comparaison total de pokemon/total niveau 100',
      className: 'btn-sexe',
      columns: [
        { header: 'Boites', property: 'nomBoite' },
        { header: 'Mâles', property: 'nbMales' }, 
        { header: 'Femelles', property: 'nbFemelles' },
        { header: 'Assexués', property: 'nbAssexues' }, 
        { header: 'Total', property: 'total' }, 
        { header: 'Level 100', property: 'nbLevel100' } 
      ],
      hasGraph: true,
      dataKey: 'boites'
    }
  ]

  private categoriesStats = [ 
    {
      id: 1,
      nomCategorie: 'Dresseurs',
      title: 'Pokemon shiny par dresseurs d\'origine',
      className: 'btn-dresseurs',
      columns: [
        { header: 'N° ID', property: 'numDresseur' },
        { header: 'Nom du Do', property: 'dresseur' },
        { header: 'Nb de Pokemon', property: 'nbShiny' }
      ],
      hasGraph: false,
      dataKey: 'dresseurs'
    },
    {
      id: 2,
      nomCategorie: 'Pokeballs',
      title: 'Pokeballs utilisées',
      chartTitle: 'Nombre de pokemons par pokeballs',
      className: 'btn-pokeballs',
      columns: [
        { header: 'Types', property: 'name' },
        { header: 'Nombre', property: 'nbShiny' }
      ],
      hasGraph: true,
      dataKey: 'pokeballs'
    },
    {
      id: 3,
      nomCategorie: 'types',
      title: 'Types',
      chartTitle: 'Répartition par types',
      className: 'btn-types',
      columns: [
        { header: 'Types', property: 'name' },
        { header: 'Nombre', property: 'nbShiny' }
      ],
      hasGraph: true,
      dataKey: 'types'
    },
    {
      id: 4,
      nomCategorie: 'Natures',
      title: 'Natures',
      chartTitle: 'Répartition par natures',
      className: 'btn-natures',
      columns: [
        { header: 'Natures', property: 'name' },
        { header: 'Nombre', property: 'nbShiny' }
      ],
      hasGraph: true,
      dataKey: 'natures'
    },
    {
      id: 5,
      nomCategorie: 'Stats IV Manquants',
      title: 'Ivs Manquants',
      chartTitle: 'Comparaison total de pokemon shiny/total pokemon IVs parfaits',
      className: 'btn-iv',
      columns: [
        { header: 'IV', property: 'ivManquant' },
        { header: 'Nombre', property: 'count' }
      ],
      hasGraph: true,
      dataKey: 'ivManquants'
    },
    {
      id: 6,
      nomCategorie: 'Sexes',
      title: 'Genres',
      chartTitle: 'Répartition par genres',
      className: 'btn-sexe',
      columns: [
        { header: 'Sexe', property: 'name' },
        { header: 'Nombre', property: 'nbShiny' }
      ],
      hasGraph: true,
      dataKey: 'sexes'
    }
  ]

  constructor() { }

  // Méthode pour récupérer les catégories
  getCategoriesPokedex() {
    return this.categoriesPokedex;
  }

  getCategoriesStats() {
    return this.categoriesStats;
  }

}
