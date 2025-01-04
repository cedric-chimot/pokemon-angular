import { BoitesPokedex } from "./BoitesPokedex";
import { Dresseur } from "./Dresseur";
import { Nature } from "./Nature";
import { Pokeball } from "./PokeBall";

export class Pokedex {
    constructor(
      public id: number,
      public numDex: string,       
      public nomPokemon: string,
      public naturePokedex: Nature, 
      public dresseurPokedex: Dresseur,
      public pokeballPokedex: Pokeball,
      public boitePokedex: BoitesPokedex,
      public generation: number // Ajout de la génération
    ) {}
}
