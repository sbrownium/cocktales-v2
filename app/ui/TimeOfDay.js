import React, {useState, useEffect} from "react";
import '../../styles/TimeOfDay.css';

export default function TimeOfDay () {
    const [dayPart, setDayPart] = useState('');
    const [happyHour, setHappyHour] = useState(false);

    // useEffect to only mount on load 
    useEffect(() => {
        const now = new Date;
        const hours = now.getHours();

        // all times local
        // 5:00 am - 11:59 am
        if ((hours >= 5) && (hours <= 11)) {
            setDayPart('this morning');
            // 12:00 pm - 5:59 pm
        } if ((hours >= 12) && (hours <= 17)) {
            setDayPart('this afternoon');
            // happy hour message 3:00 pm - 5:59 pm
        } if ((hours >= 15 ) && (hours <= 17)){
            setHappyHour(true);
        }
        // else {
        // 6:00 pm - 4:59 am
         if ((hours >= 18) || (hours <= 4)) {
            setDayPart('tonight');
        }
    }, [])

    return (
        <>
            <h1>Where ya drinkin' {dayPart}?</h1>
            {happyHour && <p className="happyHour color-1"><em>Heads up, it could be happy hour, just sayin'</em></p>}
        </>
    )
    
}