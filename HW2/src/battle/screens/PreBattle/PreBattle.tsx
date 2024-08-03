import React from 'react'
import swordIcon from '../cross-swords.png';
import './PreBattle.css'
import { PokemonList } from '../../../components/pokemon-list/PokemonList'
import { BattleContext } from '../../BattleScreen';



export const PreBattle: React.FC = () => {
    const context = React.useContext(BattleContext);

    return (
        <div>
            <h1>Battle <img src={swordIcon} alt="Swords" /></h1>
            <div className='my-pokemon-list-container'>
                {context?.opponentsTeam.length === 0 && <h2>Loading opponents team...</h2>}
                <PokemonList layout="row" listType="opponent" />
                <PokemonList layout="row" listType="player"
                chosenPokemon={context?.fighter}
                setChosenPokemon={context?.setFighter} />
            </div> 
        </div>
    )
}