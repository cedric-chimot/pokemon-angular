import { Type } from "../tables/Type";
import { Boite } from "./Boites";

export class BoiteType {
    constructor(
      public idBoite: Boite,
      public idType: Type,
      public nbPokemon: number
    ) {}
  }
  