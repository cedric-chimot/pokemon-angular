import { Pokeball } from '../tables/PokeBall';
import { Boites } from './Boites';

export class BoitePokeball {
  constructor(
    public idBoite: Boites,
    public idPokeball: Pokeball,
    public nbPokemon: number
  ) {}
}
