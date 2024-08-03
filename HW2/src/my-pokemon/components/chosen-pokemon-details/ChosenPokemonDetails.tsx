import React from 'react'
import { AppContext } from '../../../App'
import { PokemonIdType } from '../../../utilities/types'
import {PokemonScoresRate} from '../pokemon-scores-rate/PokemonScoresRate'
import './ChosenPokemonDetails.css'

interface ChosenPokemonDetailsProps
{
    index: PokemonIdType | null;
}

export const ChosenPokemonDetails: React.FC<ChosenPokemonDetailsProps> = (prop) => {
    const context = React.useContext(AppContext);
    const foundPokemon = context?.playersTeam.find(pokemon => pokemon.id === prop.index);
    return (
        // <div style={containerStyle}>
        <div className='details-container'>
            <div className='details-headline'>
                <h2>{foundPokemon && foundPokemon.name}</h2>
            </div>
            <div className='detalis'>
                <div className='details-properties-container'>
                    <div className='details-text-item'>
                        <h3 className='title'>Type: </h3>
                        <h3> {foundPokemon && foundPokemon.type}</h3>
                    </div>
                    <div className='details-text-item'>
                        <h3 className='title'>Height: </h3>
                        <h3>{foundPokemon && foundPokemon.height}</h3>
                    </div>
                    <div className='details-text-item'>
                        <h3 className='title'>Weight: </h3>
                        <h3>{foundPokemon && foundPokemon.weight}</h3>
                    </div>
                    <div className='details-text-item'>
                        <h3 className='title'>Stats: </h3>
                        <br/>
                        <div className='stats-container'>
                            <div className='stats-item'>
                                <h3 className='title'>HP: </h3> 
                                <h3>{foundPokemon && foundPokemon.stats.hp}</h3>
                            </div>
                            <div className='stats-item'>
                            <h3 className='title'>Attack: </h3>
                            <h3>{foundPokemon && foundPokemon.stats.attack}</h3>
                            </div>
                            <div className='stats-item'>
                                <h3 className='title'>Defense: </h3> 
                                <h3>{foundPokemon && foundPokemon.stats.defense}</h3>
                            </div>
                            <div className='stats-item'>
                                <h3 className='title'>Special Attack: </h3>
                                <h3>{foundPokemon && foundPokemon.stats.specialAttack}</h3>
                            </div>
                            <div className='stats-item'>
                                <h3 className='title'>Special Defense: </h3> 
                                <h3>{foundPokemon && foundPokemon.stats.specialDefense}</h3>
                            </div>
                            <div className='stats-item'>
                                <h3 className='title'>Speed: </h3>
                                <h3>{foundPokemon && foundPokemon.stats.speed}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <PokemonScoresRate wins={foundPokemon? foundPokemon.wins : "err"} losses={foundPokemon? foundPokemon.losses : "err"} />
                </div>
            </div>
            <div className='details-statistics'>
            </div>
        </div>
    )
}