import { Type } from "./Type";
import { Dresseur } from "./Dresseur";
import { Pokeball } from "./PokeBall";
import { Sexe } from "./Sexe";
import { Nature } from "./Nature";
import { Regions } from "./Regions";
import { Attaques } from "./Attaques";
import { Boites } from "../stats/Boites";

export class PokemonShiny {
  constructor(
    public id: number,
    public numDex: string,
    public nomPokemon: string,
    public nature: Nature,
    public dresseur: Dresseur,
    public pokeball: Pokeball,
    public ivManquant: string,
    public type1: Type,
    public sexe: Sexe,
    public attaque1: Attaques,
    public attaque2: Attaques,
    public attaque3: Attaques,
    public attaque4: Attaques,
    public boite: Boites,
    public position: number,
    public regionShiny?: Regions | null,
    public type2?: Type | null,
  ) {}
}
