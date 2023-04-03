import './CountdownTimer.css';
import Countdown from 'react-countdown';
import { useState } from 'react';
import sound from '../assets/owaowa.mp3'

function Timer() {

    const [time, setTime] = useState(Date.now() + 10000);

    function play() {
        new Audio(sound).play()
    }

    return (
       <div className='timer'>
            <p>
                Countdown timer:
                <Countdown date={time} onComplete={play}></Countdown>
                
            </p>
       </div> 
    );
}

export default Timer;