import { Nature } from '../tables/Nature';
import { Boites } from './Boites';

export class BoiteNature {
  constructor(
    public idBoite: Boites,
    public idNature: Nature,
    public nbPokemon: number
  ) {}
}
