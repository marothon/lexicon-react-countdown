import { useState, useEffect, useRef, FormEventHandler } from 'react';
import './countdown-timer.css';
import DigitalDisplay from './digital-display';
import useSound from 'use-sound';
import alarmSfx from '../assets/sounds/digital-alarm-clock.mp3';

function CountdownTimer() {
    const duration = useRef<number>(60)
    const [timeLeft, setTimeLeft] = useState(duration.current);
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
        setTimeLeft(duration.current);
        stopAlarmSound();
    }

    const updateDuration: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        duration.current = parseInt(form.timerStart.value);
        form.timerStart.value = '';
        resetCountdown();
      }

    return (
        <div className="countdown-container">
             <form className="new-countdown-form" onSubmit={updateDuration}>
                <input name="timerStart" type="number" placeholder='Enter duration (s)'/>
            </form>
            <DigitalDisplay totalSeconds={timeLeft}/>
            <div className="button-container">
                <button disabled={timeLeft<=0   }className='material-symbols-outlined' onClick={()=>{setIsActive(a => !a)}}>
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