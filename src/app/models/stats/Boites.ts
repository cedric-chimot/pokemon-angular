import { Dresseur } from "../Dresseur";
import { Nature } from "../Nature";
import { Pokeball } from "../PokeBall";
import { Sexe } from "../Sexe";
import { Type } from "../Type";

export class Boite {
    constructor(
      public id: number,
      public nom: string,
      public nbPokemon: number,
      public pokeballs: Pokeball[],
      public dresseurs: Dresseur[],
      public sexes: Sexe[], 
      public natures: Nature[], 
      public types: Type[],   
    ) {}
}
 