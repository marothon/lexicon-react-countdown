import { FormEventHandler, useState } from 'react'
import './App.css'
import CountdownTimer from './countdown-timer'

function App() {
  const [countdownTimers, setCountdownTimers] = useState([60]);

  const createNewTimer: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setCountdownTimers((ct) => [...ct, parseInt(form.timerStart.value)]);
    form.timerStart.value = '';
  }

  return (
    <>
      <form className="new-countdown-form" onSubmit={createNewTimer}>
        <input name="timerStart" type="number" placeholder='Enter duration (s)'/>
      </form>
      {countdownTimers.map((t) => <CountdownTimer timerStart={t}/>)}
    </>
  )
}

export default App
