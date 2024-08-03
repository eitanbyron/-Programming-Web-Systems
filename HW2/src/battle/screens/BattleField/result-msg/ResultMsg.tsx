import React from 'react'
import { AppContext } from '../../../../App';
import {BATTLE_ROUNDS_COUNT} from '../../../../utilities/consts'
import {PokemonIdType} from '../../../../utilities/types'
import './ResultMsg.css';
import {BattleContext} from '../../../BattleScreen'

interface ReturnMsgProps {
    playerWonRound: boolean;
    currentPokemonIndex: PokemonIdType;
  }

  export const ResultMsg: React.FC<ReturnMsgProps> = ({playerWonRound, currentPokemonIndex}) => {
    const [message, setMessage] = React.useState<string|null>(null);
    const [showBattleResult, setShowBattleResult] = React.useState<boolean>(false);
    const appContext = React.useContext(AppContext);  
    const battleContext = React.useContext(BattleContext);
    const roundCompleted = battleContext?.rounds!;
    const toatlPlayerWins = battleContext?.wins!;

    
    React.useEffect(() => {
      let updatedPlayerPokemons = appContext?.playersTeam;
      let currWins:number = parseInt(updatedPlayerPokemons?.find(item => item.id === currentPokemonIndex)?.wins!, 10);
      let currLosses:number = parseInt(updatedPlayerPokemons?.find(item => item.id === currentPokemonIndex)?.losses!, 10);
      if(playerWonRound)
      {
        setMessage('Your Pokemon won the round!');
        currWins += 1;
        updatedPlayerPokemons![updatedPlayerPokemons!.findIndex(item => item.id === currentPokemonIndex)].wins = currWins.toString();
      }
      else
      {
        setMessage('Your Pokemon lost the round...');
        currLosses += 1;
        updatedPlayerPokemons![updatedPlayerPokemons!.findIndex(item => item.id === currentPokemonIndex)].losses = currLosses.toString();
      }
      //lock pokemon so they couldn't play next time
      updatedPlayerPokemons![updatedPlayerPokemons!.findIndex(item => item.id === currentPokemonIndex)].used = true;

      localStorage.setItem('playerTeam', JSON.stringify(updatedPlayerPokemons));
    }, []);

    const handleContinue = () => {
      if(roundCompleted === BATTLE_ROUNDS_COUNT - 1)
      {
        setShowBattleResult(true);
        if(toatlPlayerWins > BATTLE_ROUNDS_COUNT/2)
        {
          setMessage("Congratulations! You won the battle!");
        }
        else
        {
          setMessage("You lost the battle... Better luck next time!");
        }
      }
      else
      {
        //go back to pre-batttle screen
        battleContext?.setFighter(null);
        battleContext?.setRounds(roundCompleted + 1);
      }
    }

    const handleGoBack = () => {
      //release all Pokemons so they could play next time
      let updatedPlayerPokemons = appContext?.playersTeam;
      updatedPlayerPokemons?.forEach(pokemon => {pokemon.used = false;});
      localStorage.setItem('playerTeam', JSON.stringify(updatedPlayerPokemons)); //TODO: CHECK IF IT WORKS!!!

      let didPlayerWin = toatlPlayerWins > BATTLE_ROUNDS_COUNT/2? 1 : 0;
      appContext?.setWins(appContext.wins + didPlayerWin);
      appContext?.setLosses(appContext.losses + (1-didPlayerWin));
      appContext?.setBattle(false)
    }

    return (
      <div className='res-msg-container'>
        <div className="res-msg">
          <h2>{message}</h2>
        </div>
        <div>
          {!showBattleResult && <button className="progress-buttons" onClick={handleContinue}>Press to continue</button>}
          {showBattleResult && <button className="progress-buttons" onClick={handleGoBack}>Go back to MyPokemon page</button>}
      </div>
    </div>
    );
};