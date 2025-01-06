import { BoitesPokedex } from "./BoitesPokedex";
import { Dresseur } from "./Dresseur";
import { Nature } from "./Nature";
import { Pokeball } from "./PokeBall";
import { Regions } from "./Regions";

export class PokedexNational {
    constructor(
      public id: number,
      public numDex: string,       
      public nomPokemon: string,
      public naturePokedex: Nature, 
      public dresseurPokedex: Dresseur,
      public pokeballPokedex: Pokeball,
      public boitePokedex: BoitesPokedex,
      public region: Regions
    ) { }
}