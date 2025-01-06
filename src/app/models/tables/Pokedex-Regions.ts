import { BoitesPokedex } from "./BoitesPokedex";
import { Dresseur } from "./Dresseur";
import { Nature } from "./Nature";
import { Pokeball } from "./PokeBall";
import { Regions } from "./Regions";

export class PokedexRegions {

  constructor(
    public id: number,
    public numDex: string,       
    public nomPokemon: string,
    public nomNature: Nature, 
    public dresseur: Dresseur,
    public nomPokeball: Pokeball,
    public nomBoite: BoitesPokedex,
    public region: Regions
  ) { }
}
