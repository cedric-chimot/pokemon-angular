import { BoitesPokedex } from "./BoitesPokedex";
import { Dresseur } from "./Dresseur";
import { Nature } from "./Nature";
import { Pokeball } from "./PokeBall";

export class PokedexNational {
    public regions: string[];

    constructor(
      public id: number,
      public numDex: string,       
      public nomPokemon: string,
      public naturePokedex: Nature, 
      public dresseurPokedex: Dresseur,
      public pokeballPokedex: Pokeball,
      public boitePokedex: BoitesPokedex,
        regions: string[] = [ 
        'kanto', 'johto', 'hoenn', 'sinnoh', 'unys', 'kalos', 'alola', 'galar', 'hisui', 'paldea'
        ]
    ) {
        // Initialisation de la propriété regions
        this.regions = regions || [];
    }
}