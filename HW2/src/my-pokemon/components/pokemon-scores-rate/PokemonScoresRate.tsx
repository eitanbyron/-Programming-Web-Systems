import React from 'react'
import './PokemonScoresRate.css'

interface PokemonScoreProps
{
    losses: string;
    wins: string;
}

export const PokemonScoresRate: React.FC<PokemonScoreProps> = (prop) => {
    if(prop.losses === "err" || prop.wins === "err"){
        console.log("Error in PokemonScoresRate: DID NOT GET VALID POKEMON ID IN ChosenPokemonDetails?");
        return(
            <div className='details-text-item'>
                <h3 className='titel'>PokemonScoresRate: </h3>
                <h3>ERROR</h3>
            </div>
        )
    }

    let wins:number = parseInt(prop.wins);
    let losses:number = parseInt(prop.losses);
    let winRate:number = 0;
    if(wins != 0 || losses != 0){
        winRate = wins / (wins + losses) * 100;
        winRate = parseFloat(winRate.toFixed(2));
    }

    return (
        <div className='details-statistics-container'>
            <div className='details-stat-item'>
                <h3 className='titel'>Wins: </h3>
                <h3>{prop.wins}</h3>
            </div>
            <div className='details-stat-item'>
                <h3 className='titel'>Loses: </h3>
                <h3>{prop.losses}</h3>
            </div>
            <div className='total-percentage'>
                <h3 className='titel'>{winRate}% WIN RATE </h3>
            </div>
        </div>
    )
}