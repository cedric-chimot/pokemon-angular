import { Dresseur } from '../tables/Dresseur';
import { Boites } from './Boites';

export class BoiteDresseur {
  constructor(
    public idBoite: Boites,
    public numDresseur: Dresseur,
    public nbPokemon: number
  ) {}
}
