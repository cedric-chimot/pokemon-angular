import { Dresseur } from "../tables/Dresseur";
import { Nature } from "../tables/Nature";
import { Pokeball } from "../tables/PokeBall";
import { Sexe } from "../tables/Sexe";
import { Type } from "../tables/Type";

export class Boites {
    constructor(
      public id: number,
      public nom: string,
      public nbLevel100: number,
      public pokeballs: Pokeball[],
      public dresseurs: Dresseur[],
      public sexes: Sexe[],
      public natures: Nature[],
      public types: Type[],
    ) {}
}
