import { RegionDresseur } from "./RegionDresseur";

export class Dresseur {
    constructor(
      public id: number,
      public numDresseur: string,       
      public nomDresseur: string,
      public nbPokemon: number, 
      public nbShiny: number,
      public regionDresseur: RegionDresseur        
    ) {}
}
  