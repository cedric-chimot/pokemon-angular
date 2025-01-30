import { Type } from "./Type";
import { Dresseur } from "./Dresseur";
import { Pokeball } from "./PokeBall";
import { Sexe } from "./Sexe";
import { Nature } from "./Nature";
import { Regions } from "./Regions";
import { ShinyAttaques } from "./ShinyAttaques";
import { Attaques } from "./Attaques";

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
    public type2: Type,
    public sexe: Sexe,
    public attaque1: Attaques,
    public attaque2: Attaques,
    public attaque3: Attaques,
    public attaque4: Attaques,
    public boite: string,
    public position: number,
    public regionShiny: Regions
  ) {}
}