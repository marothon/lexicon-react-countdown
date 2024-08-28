import { FormEventHandler, useRef, useState } from 'react'
import './App.css'
import CountdownTimer from './countdown-timer'

interface ICountdownTimer{
  id: number,
  timerStart: number
}

function App() {
  const [countdownTimers, setCountdownTimers] = useState<Array<ICountdownTimer>>([{id: 1, timerStart: 60}]);
  const identityRef = useRef<number>(1);

  const createNewTimer: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newCountDownTimer: ICountdownTimer = 
      {
        id: ++identityRef.current,
        timerStart: parseInt(form.timerStart.value)
      };
    setCountdownTimers((ct) => [...ct, newCountDownTimer]);
    form.timerStart.value = '';
  }

  return (
    <>
      <form className="new-countdown-form" onSubmit={createNewTimer}>
        <input name="timerStart" type="number" placeholder='Enter duration (s)'/>
      </form>
      {countdownTimers.map((t) => <CountdownTimer key={t.id} timerStart={t.timerStart}/>)}
    </>
  )
}

export default App
