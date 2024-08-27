import { useState, useEffect, useRef } from 'react';
import './countdown-timer.css';
import DigitalDisplay from './digital-display';

function CountdownTimer({timerStart}: {timerStart: number}) {
    const [timeLeft, setTimeLeft] = useState(timerStart);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number>();

    useEffect(()=> {
        if(!isActive || timeLeft == 0){
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft(t => {
                if(t-1 == 0){
                    clearInterval(intervalRef.current); 
                    setIsActive(false);
                }
                return t-1;
            });
        }, 1000)


    }, [isActive])

    return (
        <div className="countdown-container">
            <DigitalDisplay totalSeconds={timeLeft}/>
            <div className="button-container">
                <button className='material-symbols-outlined' onClick={()=>{setIsActive(a => !a)}}>
                    {isActive ? 'pause' : 'play_arrow'}
                </button>
                <button className='material-symbols-outlined' onClick={()=>{setTimeLeft(timerStart)}}>
                    restart_alt
                </button>
            </div>
        </div>
    );
}

export default CountdownTimer;