import React from "react";
import { AppContext } from "../../../App";
import { StatisticBar } from "../statistic-bar/StatisticBar";
import './StatisticContainer.css'

export const StatisticContainer: React.FC = () => {
    const context = React.useContext(AppContext);
    let numOfBattles = context?.wins! + context?.losses!;

    return (
        <div className='user-statistics'>
            <div className='statistics-text'>
                <h2>You won {context?.wins} out of {numOfBattles} battles</h2>
            </div>
            <div className='statistics-bar'>
                <StatisticBar/>
            </div>
        </div>
    )
}