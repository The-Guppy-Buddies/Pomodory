import './CountdownTimer.css';
import Countdown, { CountdownApi } from 'react-countdown';
import { useState, useRef } from 'react';
import sound from '../assets/owaowa.mp3'

function Timer() {

    const [time, setTime] = useState(1000);
    const countdownRef = useRef();
    function play() {
        new Audio(sound).play()
    }

    return (
       <div className='timer'>
            <p>
                Countdown timer:
                <Countdown ref ={countdownRef} date={time} onComplete={play}></Countdown>
                
            </p>
            {/* <input name="Add time" type="number"></input> */}
            {/* <button className="btn btn-primary" onClick={() => setTime (time+1000)}>Add 1m</button> */}
            <button className="btn btn-primary" onClick={() => countdownRef.current.api.start()}>start</button>
            <button className="btn btn-primary" onClick={() => countdownRef.current.api.pause()}>Pause</button>
            <button className="btn btn-primary" onClick={() => setTime(time + 1000)}>You have to name it</button>
       </div> 
    );
}

export default Timer;