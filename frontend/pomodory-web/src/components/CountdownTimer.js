import './CountdownTimer.css';
import Countdown from 'react-countdown';

function Timer() {
    return (
       <div className='timer'>
            <p>
                Countdown timer:
                <Countdown date={Date.now() + 5000}>
                </Countdown>
            </p>
       </div> 
    );
}

export default Timer;