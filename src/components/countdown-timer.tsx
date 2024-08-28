import { useState, useEffect, useRef } from 'react';
import './countdown-timer.css';
import DigitalDisplay from './digital-display';
import useSound from 'use-sound';
import alarmSfx from '../assets/sounds/digital-alarm-clock.mp3';

function CountdownTimer({timerStart}: {timerStart: number}) {
    const [timeLeft, setTimeLeft] = useState(timerStart);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number>();
    const [play, {stop}] = useSound(alarmSfx);
    const [playAlarmSound, stopAlarmSound] = [play, stop];

    useEffect(()=> {
        if(!isActive){
            clearInterval(intervalRef.current);
            if(timeLeft <= 0){
                playAlarmSound();
            }
            return;
        }

        if(timeLeft >= 0){
            intervalRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if(t-1 == 0){
                        setIsActive(false);
                    }
                        return t-1;
                });
            }, 1000)
        }
    

    }, [isActive])

    const resetCountdown = ()=>{
        setTimeLeft(timerStart);
        stopAlarmSound();
    }

    return (
        <div className="countdown-container">
            <DigitalDisplay totalSeconds={timeLeft}/>
            <div className="button-container">
                <button disabled={timeLeft<=0}className='material-symbols-outlined' onClick={()=>{setIsActive(a => !a)}}>
                    {isActive ? 'pause' : 'play_arrow'}
                </button>
                <button className='material-symbols-outlined' onClick={resetCountdown}>
                    restart_alt
                </button>
            </div>
        </div>
    );
}

export default CountdownTimer;