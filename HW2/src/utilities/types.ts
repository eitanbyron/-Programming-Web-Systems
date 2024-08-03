export interface PokemonType {
    id: string;
    name: string;
    image: string;
    type: string;
    height: string;
    weight: string;
    stats: {
        hp: string;
        attack: string;
        defense: string;
        specialAttack: string;
        specialDefense: string;
        speed: string;
    };
    numOfMoves: string;
    losses: string;
    wins: string;
    used: boolean;
    // details: string;
}

export type PokemonIdType = string;

export type PokemonStatsType = {baseStat: number, effort: number, stat: {name: string, url: string}};