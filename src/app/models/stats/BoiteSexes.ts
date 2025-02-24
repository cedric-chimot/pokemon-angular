import { Sexe } from '../tables/Sexe';
import { Boites } from './Boites';

export class BoiteSexe {
  constructor(
    public idBoite: Boites,
    public idSexe: Sexe,
    public nbPokemon: number
  ) {}
}
