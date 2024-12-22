import { Pokeball } from "../PokeBall";
import { Boite } from "./Boites";

export class BoitePokeball {
    constructor(
      public idBoite: Boite,
      public idPokeball: Pokeball,
      public nbPokemon: number
    ) {}
  }
  