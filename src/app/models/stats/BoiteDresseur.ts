import { Dresseur } from "../Dresseur";
import { Boite } from "./Boites";

export class BoiteDresseur {
    constructor(
      public idBoite: Boite,
      public idDresseur: Dresseur,
      public nbPokemon: number
    ) {}
  }
  