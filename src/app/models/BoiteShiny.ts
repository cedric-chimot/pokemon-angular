import { Type } from "./Type";
import { Dresseur } from "./Dresseur";
import { Pokeball } from "./PokeBall";
import { Sexe } from "./Sexe";
import { Nature } from "./Nature";

export class BoiteShiny {
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
        public attaque1: string,
        public attaque2: string,
        public attaque3: string,
        public attaque4: string,
        public boite: string,
        public position: number
      ) {}
}