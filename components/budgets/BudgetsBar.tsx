"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function BudgetsBar({ percentage }: { percentage: number }) {
    return (
        <div className="flex justify-center p-10">
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: percentage >= 100 ? '#DC2626' : '#F59E0B',
                    trailColor: '#e1e1e1',
                    textColor: percentage >= 100 ? '#DC2626' : '#6b21a8',
                    textSize: 8
                })}
                text={`${percentage}% Gastado`}
                value={percentage}
            />
        </div>
    )
}
