import { Nature } from "../Nature";
import { Boite } from "./Boites";

export class BoiteNature {
    constructor(
      public idBoite: Boite,
      public idNature: Nature,
      public nbPokemon: number
    ) {}
  }
  