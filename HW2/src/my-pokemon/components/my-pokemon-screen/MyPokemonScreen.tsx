import React from 'react'
import { PokemonList } from '../../../components/pokemon-list/PokemonList'
import { ChosenPokemonDetails } from '../chosen-pokemon-details/ChosenPokemonDetails'
import {PokemonIdType} from '../../../utilities/types'
import { StatisticContainer } from '../statistic-container/StatisticContainer'
import { AppContext } from '../../../App'
import './MyPokemonScreen.css'

export const MyPokemonScreen: React.FC = () => {
    const context = React.useContext(AppContext);
    const [selectedPokemonIndex, setSelectedPokemonIndex] = React.useState<PokemonIdType | null >(null);

    const handleRetry = () => {
        context?.onRetry(true);
        context?.setLosses(0);
        context?.setWins(0);
      };

    const shiftScreenMode = () => {
        context?.setBattle(true);
    };
    const isIndexRelevant = ():boolean => {
        const foundItem = context?.playersTeam.find(item => item.id === selectedPokemonIndex);
        if(foundItem === undefined)
        {
            setSelectedPokemonIndex(null)
        }
        return foundItem === undefined ? false : true;
    }

    React.useEffect(() => {
        //In case we hit "refresh", we want to reset all "used" values to "false
        // Check if there is at least one player with "used" set to true
        const hasUsedPlayer = context?.playersTeam.some(player => player.used === true);
    
        if (hasUsedPlayer && context?.playersTeam) {
          // Set all "used" values to false
          const updatedPlayersTeam = context?.playersTeam.map(player => ({
            ...player,
            used: false,
          }));
          
          context?.setTeam(updatedPlayersTeam);
          localStorage.setItem('playerTeam', JSON.stringify(updatedPlayersTeam));
        }
      }, [context?.playersTeam]); // Run the effect whenever playersTeam changes

    return (
        // <div style={containerStyle}>
        <div className='my-pokemon-screen'>   
            <h1 className='my-pokemon-title'>My Pokemon</h1>
            <div className='my-pokemon-main-container'>
                <div className='main-container-item with-divider'>
                    <PokemonList layout="column"
                    listType="player"
                    chosenPokemon={selectedPokemonIndex}
                    setChosenPokemon={setSelectedPokemonIndex} />
                </div>
                <div className='main-container-item'>
                    {selectedPokemonIndex && isIndexRelevant() && <ChosenPokemonDetails index={selectedPokemonIndex} />}
                    {!selectedPokemonIndex && <h2 className='details-default-message'>No Pokemon Selected</h2>} 
                </div>
            </div>
            <button className='lets-battle-button' onClick={shiftScreenMode}>
                Lets Battle!
            </button>
            <div className='my-pokemon-user-statistics'>
                <StatisticContainer/>
            </div>
            <button className='start-over-button' onClick={handleRetry}>
                Start Over
            </button>
        </div> 
    )}