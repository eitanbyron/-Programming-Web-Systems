import React from 'react'
import {PokemonIdType} from '../utilities/types'
import { PreBattle } from './screens/PreBattle/PreBattle'
import { Duel } from './screens/BattleField/Duel'
import { randomOrder, setNewPokemonTeam } from '../utilities/scripts'
import { AppContext } from '../App'
import { PokemonType } from '../utilities/types'

interface BattleContext {
  opponentsTeam: PokemonType[]
  opponetOrder: number[];
  fighter: PokemonIdType | null;
  setFighter: (value: string|null) => void;
  rounds: number;
  setRounds: (value: number) => void;
  wins: number;
  setWins: (value: number) => void;
}

let opporder = [0,1,2];

export const BattleContext = React.createContext<BattleContext | null>(null)

export const BattleScreen: React.FC = () => {
const appContext = React.useContext(AppContext);

const [opponentPokemons, setOpponentPokemons] = React.useState<PokemonType[]>([]);
const [fighterIndex, setFighterIndex] = React.useState<PokemonIdType | null >(null);
const [r, sR] = React.useState<number>(0);
const [w, sW] = React.useState<number>(0);

React.useEffect(() => {
  opporder = randomOrder();
  setNewPokemonTeam(setOpponentPokemons);
}, [appContext?.inBattle]);

return (
    <BattleContext.Provider value={{opponentsTeam:opponentPokemons, opponetOrder: opporder, fighter: fighterIndex, 
      setFighter: setFighterIndex, rounds:r, setRounds: sR, wins: w, setWins: sW }}>
    <div>
        <div className='main-battle'>
          {!fighterIndex && <PreBattle />}
        </div>
        <div className='battle-field'>
          {fighterIndex && <Duel />}
        </div>
        </div>
        </BattleContext.Provider>
);
}