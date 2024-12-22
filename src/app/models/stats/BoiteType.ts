import { Type } from "../Type";
import { Boite } from "./Boites";

export class BoiteType {
    constructor(
      public idBoite: Boite,
      public idType: Type,
      public nbPokemon: number
    ) {}
  }
  