import React from 'react'
import { useState } from 'react'
import { PokemonType } from './utilities/types'
import {setNewPokemonTeam} from './utilities/scripts'
import { MyPokemonScreen } from './my-pokemon/components/my-pokemon-screen/MyPokemonScreen'
import { BattleScreen } from './battle/BattleScreen'
import './App.css'

interface AppContext {
  playersTeam: PokemonType[];
  setTeam: (value: PokemonType[]) => void;
  onRetry: (value: boolean) => void;
  setBattle: (value: boolean) => void;
  inBattle: boolean;
  wins: number;
  losses: number;
  setWins: (value: number) => void;
  setLosses: (value: number) => void;
}

export const AppContext = React.createContext<AppContext | null>(null)

export const App: React.FC = () => {
  const [inBattle, setInBattle] = useState<boolean>(false);
  const [playerPokemons, setPlayerPokemons] = React.useState<PokemonType[]>([]);
  const [retry, setRetry] = React.useState<boolean>(false);
  const [wins, setWins] = React.useState<number>(0);
  const [losses, setLosses] = React.useState<number>(0);

  // Load teams from localStorage or fetch new teams
  React.useEffect(() => {
    const storedPlayerTeam = localStorage.getItem('playerTeam');

    if (storedPlayerTeam!=null && !retry) {
      setPlayerPokemons(JSON.parse(storedPlayerTeam));
      setWins(JSON.parse(localStorage.getItem('wins')!));
      setLosses(JSON.parse(localStorage.getItem('losses')!));
    } else {
      setNewPokemonTeam(setPlayerPokemons);
      setWins(0);
      setLosses(0);
      setRetry(false);
    }
  }, [retry]);

  // Save teams to localStorage whenever they change
  React.useEffect(() => {
     localStorage.setItem('playerTeam', JSON.stringify(playerPokemons));
     localStorage.setItem('wins', JSON.stringify(wins));
     localStorage.setItem('losses', JSON.stringify(losses));
  }, [playerPokemons, wins, losses]);

  return (
    //in the first barckets, we can pass context to the component
    <AppContext.Provider value={{ playersTeam: playerPokemons,setTeam: setPlayerPokemons, onRetry: setRetry, setBattle: setInBattle, 
      inBattle, wins, losses, setWins, setLosses}}>
      <div className="app-container">
        <div className='my-pokemon-container'>
          {!inBattle && <MyPokemonScreen />}
        </div>
        <div className='battle-container'>
          {inBattle && <BattleScreen />}
        </div>
        <br/>
      </div>
    </AppContext.Provider>
  );
};

