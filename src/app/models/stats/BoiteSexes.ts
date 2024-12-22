import { Sexe } from "../Sexe";
import { Boite } from "./Boites";

export class BoiteSexe {
    constructor(
      public idBoite: Boite,
      public idSexe: Sexe,
      public nbPokemon: number
    ) {}
  }
  