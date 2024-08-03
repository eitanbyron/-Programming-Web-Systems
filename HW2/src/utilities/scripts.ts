import { PokemonType, PokemonStatsType } from "./types";
import { POKEMON_INDEX_RANGE, POKEMON_TEAM_SIZE, POKEMON_MOVES_COUNT } from "./consts";

export function getRandomNumber(range: number): number {
    return Math.floor(Math.random() * range);
}

export const drawNewPokemon = async (pokemonIndex: number) => {
    let pokemonFromAPI;
    try {
      pokemonFromAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`);
      pokemonFromAPI = await pokemonFromAPI.json();
    }
    catch (e) {
      console.error("could not fetch pokemon from API");
    }

    if (pokemonFromAPI) {
      
      const newPokemon: PokemonType = {
        id: pokemonFromAPI.id,
        name: pokemonFromAPI.name,
        image: pokemonFromAPI.sprites.front_default,
        type: pokemonFromAPI.types[0].type.name,
        height: pokemonFromAPI.height.toString(),
        weight: pokemonFromAPI.weight.toString(),
        stats: {
          hp: pokemonFromAPI.stats.find((statItem: PokemonStatsType) => statItem.stat.name === "hp").base_stat.toString(),
          attack: pokemonFromAPI.stats.find((statItem: PokemonStatsType) => statItem.stat.name === "attack").base_stat.toString(),
          defense: pokemonFromAPI.stats.find((statItem: PokemonStatsType) => statItem.stat.name === "defense").base_stat.toString(),
          specialAttack: pokemonFromAPI.stats.find((statItem: PokemonStatsType) => statItem.stat.name === "special-attack").base_stat.toString(),
          specialDefense: pokemonFromAPI.stats.find((statItem: PokemonStatsType) => statItem.stat.name === "special-defense").base_stat.toString(),
          speed: pokemonFromAPI.stats.find((statItem: PokemonStatsType) => statItem.stat.name === "speed").base_stat.toString(),
        },
        
        numOfMoves: pokemonFromAPI.moves.length.toString(),
        losses: "0",
        wins: "0",
        used: false,
      };

      return newPokemon
    } 
    else {
      return null;
    }
  };

  export function getRandomSetOfNumbers(count: number, range: number): number[] {
    const uniqueNumbers: Set<number> = new Set();
  
    while (uniqueNumbers.size < count) {
      const randomNumber = getRandomNumber(range);
      uniqueNumbers.add(randomNumber);
    }
  
    return Array.from(uniqueNumbers);
  }

  export const setNewPokemonTeam = async (SetPokemonTeam: (value: PokemonType[]) => void) => {
    const promises = [];

    const randomIndexSet = getRandomSetOfNumbers(POKEMON_TEAM_SIZE, POKEMON_INDEX_RANGE);
    for (let i = 0; i < POKEMON_TEAM_SIZE; i++) {
      promises.push(drawNewPokemon(randomIndexSet[i]));
    }
  
    try {
      const newPokemonList = (await Promise.all(promises)).filter((pokemon) => pokemon !== null) as PokemonType[];
      SetPokemonTeam(newPokemonList);
  
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };



  function getRandomNumbers( n: number, m: number) {
    const numbers = Array.from({ length: m }, (_, i) => i);
    const result = [];
  
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }
  
    return result;
  }

  export const howStrong = async (url: any) => {
    let powerFromAPI;
    try {
      powerFromAPI = await fetch(url);
      powerFromAPI = await powerFromAPI.json();
    }
    catch (e) {
      console.error("could not fetch moves from API");
    }
    if (powerFromAPI) {
      return powerFromAPI.power;
    }
  }

  export type move ={
    name: string;
    power: number;
  }
  
  export const drawRandomMoves = async (pokemonIndex: any) => {
    let pokemonFromAPI;
    let moves: move[] = [];
    try {
      pokemonFromAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`);
      pokemonFromAPI = await pokemonFromAPI.json();
    }
    catch (e) {
      console.error("could not fetch moves from API");
    }

    if (pokemonFromAPI) {
      let movesFromAPI = pokemonFromAPI.moves;
      let size = movesFromAPI.length;
      let movesnum = Math.min(POKEMON_MOVES_COUNT,size);
      let randoms = Array.from({length: movesnum}, (_, i) => i);
      if (size > POKEMON_MOVES_COUNT){
        randoms = getRandomNumbers(movesnum, size);
      }
      for (let i = 0; i < movesnum; i++) {
        moves.push({name: movesFromAPI[randoms[i]].move.name, power: 0});
        let url = movesFromAPI[randoms[i]].move.url;
        moves[i].power = await howStrong(url);
      }
    }
    
    return moves;
  }

  export const randomOrder = () => {
    let order = [0, 1, 2];

    for (let i = order.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
      }
    return order;
  }

  export const getTypefactor = async (type1: string|undefined, type2: string|undefined) => {
    let factor = [1,1];
    let factorFromAPI;
    try {
      factorFromAPI = await fetch(`https://pokeapi.co/api/v2/type/${type1}/`);
      factorFromAPI = await factorFromAPI.json();
    }
    catch (e) {
      console.error("could not fetch moves from API");
    }
    if (factorFromAPI) {
      if (factorFromAPI.damage_relations.double_damage_to.find((type: { name: string; }) => type.name === type2))
          factor[0] =2;
      if (factorFromAPI.damage_relations.half_damage_to.find((type: { name: string; }) => type.name === type2))
          factor[0] = 0.5;
      if (factorFromAPI.damage_relations.no_damage_to.find((type: { name: string; }) => type.name === type2))
          factor[0] = 0;
      if (factorFromAPI.damage_relations.double_damage_from.find((type: { name: string; }) => type.name === type2))
          factor[1] =2;
      if (factorFromAPI.damage_relations.half_damage_from.find((type: { name: string; }) => type.name === type2))
          factor[1] = 0.5;
      if (factorFromAPI.damage_relations.no_damage_from.find((type: { name: string; }) => type.name === type2))
          factor[1] = 0;
      return factor;
    }

  }