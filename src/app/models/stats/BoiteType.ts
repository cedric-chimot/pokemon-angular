import { Type } from '../tables/Type';
import { Boites } from './Boites';

export class BoiteType {
  constructor(
    public idBoite: Boites,
    public idType: Type,
    public nbPokemon: number
  ) {}
}
