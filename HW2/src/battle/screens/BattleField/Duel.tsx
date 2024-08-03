import React from 'react'
import { BattleContext } from '../../BattleScreen';
import swordIcon from '../cross-swords.png';
import './Duel.css'
import { AppContext } from '../../../App';
import { move, drawRandomMoves} from '../../../utilities/scripts';
import { Totalpower } from './TotalPower/Totalpower';
import { PokemonType } from '../../../utilities/types';
import { ResultMsg } from './result-msg/ResultMsg';

interface DuelDetails {
  myItem: PokemonType | undefined;
  oppItem: PokemonType | undefined;
  oppmoves: move[];
  chosen: move | null;
  result: number;
  setResult: (value: number) => void;
}
export const DuelDetails = React.createContext<DuelDetails | null>(null)

export const Duel: React.FC = () => {
    const battleContext = React.useContext(BattleContext);
    const appContext = React.useContext(AppContext);
    const fighterItem = appContext?.playersTeam.find(item => item.id == battleContext?.fighter);
    
    const oIndex = battleContext?.opponetOrder[battleContext?.rounds];
    const opponentItem = battleContext?.opponentsTeam[oIndex!];
    const [mymoves, setMoves] = React.useState<move[]>([]); 
    const [opponentMoves, setOpponentMoves] = React.useState<move[]>([]);
    const [chosenMove, setChosenMove] = React.useState<move | null>(null);
    const [res, setRes] = React.useState<number>(0);

    React.useEffect(() => {
      const fetchMoves = async () => {
        if (fighterItem?.id && opponentItem?.id) {
          const [fighterMoves, opponentMoves] = await Promise.all([
            drawRandomMoves(fighterItem.id),
            drawRandomMoves(opponentItem.id)
          ]);
    
          setMoves(fighterMoves);
          setOpponentMoves(opponentMoves);
        }
      };
    
      fetchMoves();
    }, [battleContext?.fighter]);

    const selectmove = (mymove: move) => {
         setChosenMove(mymove);
    };
  

    const myMaxPower = Math.max(...mymoves.map(mymoves => mymoves.power || 0));
    
    let renderedComponent;
    switch (res) {
      case 0:
        renderedComponent = <Totalpower />;
        break;
      case 1:
        renderedComponent = <ResultMsg playerWonRound= {true} currentPokemonIndex={fighterItem!.id}/>;
        break;
      case 2:
        renderedComponent = <ResultMsg playerWonRound= {false} currentPokemonIndex={fighterItem!.id}/>;
        break;
    }
  
    return (
      <DuelDetails.Provider value=
      {{myItem: fighterItem, oppItem: opponentItem, oppmoves: opponentMoves, 
        chosen: chosenMove, result: res, setResult: setRes }}>
        <div>
            <h1>Battle <img src={swordIcon} alt="Swords" /></h1>
            <div className="opponet-fighter">
            <div className="opponet-entity">
            <div className="o-image">
                 <img src = {opponentItem?.image}></img>
              </div>
              <div className="pokemon-name">{opponentItem?.name}</div>
            </div>
            <div className="opp-moves" >
            {opponentMoves.length === 0 && <h2>Loading opponents moves</h2>}
            {opponentMoves.map((move, index) => (
            <button key={index} className={`oppmove-${index}`}>
              {move.name} ({move.power || 0})
            </button> ))}
            </div>  
            </div>
            <div className = "changing-box"> 
              {chosenMove && renderedComponent}
            </div>
            <div className="my-fighter">
            <div className="my-entity">
            <div className="pokemon-name">{fighterItem?.name}</div>
            <div className="o-image">
                 <img src = {fighterItem?.image}></img>
            </div>
            </div>
            <div className="my-moves">
            {mymoves.length === 0 && <h2>Loading your moves</h2>}
            {mymoves.map((mymove, index) => (
            <button key={index} onClick={() => selectmove(mymove)} disabled={chosenMove !== null}
              className={`move-${index} ${mymove.power === myMaxPower ? 'max-power' : ''}`}>
              {mymove.name} ({mymove.power || 0})
            </button>
          ))}
        </div>
            </div>
        </div>
        </DuelDetails.Provider>
    );
}
