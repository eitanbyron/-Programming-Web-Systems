import React from 'react'
import { AppContext } from '../../App';
import { BattleContext } from '../../battle/BattleScreen';
import { PokemonEntity } from '../pokemon-entity/PokemonEntity';
import {PokemonIdType} from '../../utilities/types'

interface PokemonListProps {
    layout: 'row' | 'column';
    listType: 'player' | 'opponent';
    chosenPokemon?: PokemonIdType | null,
    setChosenPokemon?: (value: PokemonIdType|null) => void;
  }

  export const PokemonList: React.FC<PokemonListProps> = ({ layout, listType, chosenPokemon, setChosenPokemon }) => {
    const appContext = React.useContext(AppContext);
    const battleContext = React.useContext(BattleContext);

    // Define styles based on the passed parameters
    const containerStyle : React.CSSProperties = {
      display: 'flex',
      flexDirection: layout === 'row' ? 'row' : 'column',
      alignItems: 'center',
    };

    return (
        <div className="pokemon-list-container" style={containerStyle}>
            {listType=='player' && appContext?.playersTeam.map(pokemon => 
            <PokemonEntity key={pokemon.id} pokemonCharacter={pokemon} className="player-pokemon"
            chosenPokemon={chosenPokemon} setChosenPokemon={setChosenPokemon}
            />)}
            {listType=='opponent' && battleContext?.opponentsTeam.map(pokemon => 
            <PokemonEntity key={pokemon.id} pokemonCharacter={pokemon} className="opponent-pokemon"
            />)}
        </div>
    )
}