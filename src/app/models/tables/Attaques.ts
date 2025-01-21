import { Type } from "./Type";

export class Attaques {
    constructor(
        public id: number,         
        public nomAttaque: string,
        public typeAttaque: Type,         
    ) {}
}
