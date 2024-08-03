import React from "react";
import { AppContext } from "../../../App";
import './StatisticBar.css'

export const StatisticBar: React.FC = () => {
    const context = React.useContext(AppContext);
    let numOfBattles = context?.wins! + context?.losses!;

    let percentage = 0;
    if (numOfBattles > 0) {
        percentage = (context?.wins! / numOfBattles) * 100;
        percentage = parseInt(percentage.toFixed(2));
    }

    const gradient = `conic-gradient(#B5838D ${percentage}%, #FFCDB2 0)`;

    return (

        <div className="progressBar">
            <div className="circle progressBarPercentage" style={{ backgroundImage: gradient }} >
                <div className="percentageText">{percentage}%</div>
            </div>
        </div>

    )
}
