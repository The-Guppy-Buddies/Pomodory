import './CountdownTimer.css';
import Countdown, { CountdownApi, calcTimeDelta , zeroPad} from 'react-countdown';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import sound from '../assets/owaowa.mp3'
import Sprite from '../assets/Sprite.png'
import { Toast } from 'bootstrap';

function Timer() {
    //time measured in ms, 1000ms = 1s
    
    const [time, setTime] = useState(Date.now());
    const [pomodoriesCompleted, setPomodoriesCompleted] = useState(1);
    //countdownRef given starting state of 0 
    const countdownRef = useRef();

    //playing sound mp3 file in components folder
    function play() {
        new Audio(sound).play()
    }

    //resetting the time on timer to 00:00:00:00 if user clicks on reset button
    
    // useEffect(() => {

    // }, [time])
    
    function Reset(){
        useState(setTime(Date.now()));
    }

    
    function calculateTime(){

        //creating hours, minutes and seconds variables that get the input from the from that we submit
        //if no value is provided, the value defaults to 0
        const hours = document.getElementById('+ 1hr').value||0;
        const minutes =document.getElementById('+ 1m').value||0 ;
        const seconds = document.getElementById('+ 1s').value||0;
        

        setTime(Date.now() + (1000 * 3600 * hours) 
                        + (1000 * 60 * minutes)
                        + (1000 * seconds));
    }


    function displaySprite(displaySpriteImage){
            
        // {displaySpriteImage && <img src = {(Sprite)} alt = '1 pomodory completed' style={{ height: "20vh"}}></img>}
        // {!displaySpriteImage && <img src = {require("https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/DCTM_Penguin_UK_DK_AL526630_wkmzns.jpg")} alt = "bird" style ={{height:"20vh"}}></img>}
      
        
        
        if(displaySpriteImage){
            setPomodoriesCompleted(pomodoriesCompleted+1);
            console.log("I am true! " + pomodoriesCompleted);
            
            
            const toastElem = document.getElementById('toast-sign-in');
            toastElem.querySelector(".toast-body").innerHTML = `${pomodoriesCompleted} Pomodories completed <img src = ${Sprite} height= 125vh ></img>`
            const toast = new Toast(toastElem);
            toast.show();
            
        }else{
            console.log("I am false!" + pomodoriesCompleted);
        }
    }

    
    //try wrapping with useState(() =>{}, []);
    return (
        //use input type number, and then htm
       <div className='timer'>
            <p>
                Countdown timer:
                {/*"event = {() => {function1(); function2();...}}", 
                if more than 1 function, we use semi-colon delimited function calls */}
                <Countdown ref ={countdownRef} date={time} autoStart = {false} controlled = {false} onComplete={()=>{play(); displaySprite(true);}}></Countdown>

                   
            </p>
            {/* braces indicate that it is dynamically rendered, we can use javascript within these */}
            
            <button class="btn btn-primary" onClick={() => countdownRef.current.api.start()}>start</button>
            <button class="btn btn-primary" onClick={() => countdownRef.current.api.pause()}>Pause</button>
            <button class="btn btn-primary" onClick={() => {Reset()}}>Reset</button>
    
            <form>
                <input className="mt-2 form-control" type = "number" min = "0" id="+ 1hr"  placeholder='+ 1hr'></input>
                <input className="mt-2 form-control" type = "number" min = "0" id="+ 1m"  placeholder='+ 1m'></input>
                <input className="mt-2 form-control" type = "number" min = "0" id="+ 1s"  placeholder='+ 1s'></input>
                <button className="mt-2 btn btn-primary" onClick = {() =>{calculateTime()} }type="button">Submit</button>
            </form>
            
            
       </div> 
    );
}

export default Timer;