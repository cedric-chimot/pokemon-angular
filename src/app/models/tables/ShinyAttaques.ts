import { Attaques } from "./Attaques";
import { PokemonShiny } from "./PokemonShiny";

export class ShinyAttaques {
    constructor(
        public id: number,         
        public pokemonShiny: PokemonShiny,    
        public attaques: Attaques[],
        public position: number  
    ) {}
}
