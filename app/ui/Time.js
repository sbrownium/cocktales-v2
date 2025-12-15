import React from "react";
import './../styles/Time'

export default function Time ({initialTimeStamp}) {
    const duration = Date.now() - initialTimeStamp;
    let timeSince = initialTimeStamp
    let suffix = ''

    const nthNumber = (number) => {
        if (number > 3 && number < 21) return 'th';
        switch (number % 10) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
      };

    if (duration < (1000*60*5)) {
        timeSince = 'Like Just Now'
    } if ((duration >= (1000*60*5)) && (duration < (1000*60*60))) {
        timeSince = (Math.floor(duration/(1000*60)) + ' Minutes Ago')  
    } if ((duration >= (1000*60*60)) && (duration < (1000*60*60*2))) {
        timeSince = (Math.floor(duration/(1000*60*60)) + ' Hour Ago')
    } if ((duration >= (1000*60*60*2)) && (duration < (1000*60*60*24))) {
        timeSince = (Math.floor(duration/(1000*60*60)) + ' Hours Ago')    
    } if (duration >= (1000*60*60*24) && (duration < (1000*60*60*24*2))) {
        timeSince = (Math.floor(duration/(1000*60*60*24)) + ' Day Ago')
    } if (duration >= (1000*60*60*24*2) && (duration < (1000*60*60*24*7))) {
        timeSince = (Math.floor(duration/(1000*60*60*24)) + ' Days Ago')
    } if (duration >= (1000*60*60*24*7) && (duration < (1000*60*60*24*7*2))) {
        timeSince = (Math.floor(duration/(1000*60*60*24*7)) + ' Week Ago')
    } if (duration >= (1000*60*60*24*7*2) && (duration < (1000*60*60*24*7*4))) {
        timeSince = (Math.floor(duration/(1000*60*60*24*7)) + ' Weeks Ago')
    } if (duration >= (1000*60*60*24*7*4) && (duration < (1000*60*60*24*7*5))) {
        timeSince = (Math.floor(duration/(1000*60*60*24*7*4)) + ' Month Ago')
    } if (duration >= (1000*60*60*24*7*5) && (new Date(initialTimeStamp).getFullYear() === new Date().getFullYear())) {
        timeSince = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric'
        }).format(initialTimeStamp)
        suffix = nthNumber(new Date(initialTimeStamp).getDate())
    } if (duration >= (1000*60*60*24*7*5) && (new Date(initialTimeStamp).getFullYear() != new Date().getFullYear())) {
        timeSince = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric' 
            }).format(initialTimeStamp)
    }
          
    return (
        <time>
            {timeSince}<sup>{suffix}</sup>
        </time> 
    )              
}
  