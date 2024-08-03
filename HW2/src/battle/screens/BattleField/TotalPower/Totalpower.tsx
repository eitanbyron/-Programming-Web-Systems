import React from 'react'
import { DuelDetails } from '../Duel';
import './Totalpower.css'
import {getTypefactor} from '../../../../utilities/scripts';
import { BattleContext } from '../../../BattleScreen';

export const Totalpower: React.FC = () => {
    const duelContext = React.useContext(DuelDetails);
    const battleContext = React.useContext(BattleContext);

    let length = duelContext && duelContext.oppmoves ? duelContext.oppmoves.length : 0;
    let randomIndex = Math.floor(Math.random() * length);
    let oppmove = duelContext?.oppmoves[randomIndex];
    let mymove = duelContext?.chosen;
    const [typeFactors, setTypeFactors] = React.useState<any[]|undefined>([]);


    React.useEffect(() => {
      const fetchTypeFactors = async () => {
        if (duelContext?.myItem?.type && duelContext?.oppItem?.type) {
          const factors = await getTypefactor(duelContext?.myItem?.type, duelContext?.oppItem?.type);
          setTypeFactors(factors);
        } else {
          setTypeFactors([1,1]);
        }
      };
    
      fetchTypeFactors();
        }, [duelContext?.chosen]);

    let myTotalPower = 0, oppTotalPower = 0;

    //TODO: add attack and deffence
    if (oppmove && duelContext?.chosen && typeFactors) {
        let myAttack: number = parseInt(duelContext?.myItem?.stats.attack!) || 0;
        let myDefence: number = parseInt(duelContext?.myItem?.stats.defense!) || 0;

        let oppAttack: number = parseInt(duelContext?.oppItem?.stats.attack!) || 0;
        let oppDefence: number = parseInt(duelContext?.oppItem?.stats.defense!) || 0;

        myTotalPower = (duelContext?.chosen?.power + myAttack)*(typeFactors[0]) - oppDefence;
        oppTotalPower = (oppmove?.power + oppAttack)*(typeFactors[1]) - myDefence;
    }

    function finishRound() {
      if (myTotalPower >= oppTotalPower) {
        const newWins = battleContext?.wins! + 1;

        duelContext?.setResult(1);
        battleContext?.setWins(newWins);
      } else {
        duelContext?.setResult(2);
      }
    }


    return (
        
    <div className="res-container">
      <div className="res" onClick={finishRound}>
        <div className="left-side">
          <p> {oppmove?.name}&nbsp;{' >>> '}&nbsp;{oppTotalPower} </p>
          <p>VS</p>
          <p> {mymove?.name}&nbsp;{' >>> '}&nbsp;{myTotalPower} </p>
        </div>
        <div className="right-side">
          <p>Total Power</p>  
        </div>
      </div>
      {<button className="progress-buttons" onClick={finishRound}>Press to continue</button>}
    </div>
    )
}