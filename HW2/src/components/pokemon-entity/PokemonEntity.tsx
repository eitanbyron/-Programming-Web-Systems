import React from 'react'
import './PokemonEntity.css'
import { PokemonType } from '../../utilities/types';

export interface PokemonEntityProps {
    pokemonCharacter: PokemonType,
    className: "opponent-pokemon" | "player-pokemon",
    chosenPokemon?: string | null,
    setChosenPokemon?: (value: string|null) => void;
}

export const PokemonEntity: React.FC<PokemonEntityProps> = ({pokemonCharacter, className, chosenPokemon, setChosenPokemon}) => {
    const canUseStatus: string = pokemonCharacter.used===true? "canNotUse" : "canUse";

    const onClickHandler = () => {
        if(pokemonCharacter.used === true)
        {
            return;
        }

        if(setChosenPokemon !== undefined) 
        {
            if(chosenPokemon === null) //none selected
            {
                setChosenPokemon(pokemonCharacter.id);
            }
            else if(chosenPokemon === pokemonCharacter.id) //clicking twice on the same pokemon turns it off
            {
                setChosenPokemon(null);
            }
            else //other pokemon is selected, we want to replace with this one
            {
                setChosenPokemon(pokemonCharacter.id);
            }
        }
        else
        {
            console.error('setChosenPokemon is undefined');
        }
    }

    return (
        <div className="pokemon-entity">
            {className === "player-pokemon" && <div className="pokemon-name">{pokemonCharacter.name}</div>}
            <div className={"pokemon-image "+ className + " " + canUseStatus}>
            <img 
                src= {pokemonCharacter.image}
                alt= {pokemonCharacter.name}
                onClick={setChosenPokemon ? onClickHandler : undefined} //optional onClick function
            />
            </div>
            {className === "opponent-pokemon" &&<div className="pokemon-name">{pokemonCharacter.name}</div>}
        </div>
    )
}