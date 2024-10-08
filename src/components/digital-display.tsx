import './digital-display.css';

export default function DigitalDisplay({totalSeconds}: {totalSeconds: number}) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  
  let className = "digital-display" + (totalSeconds <= 0 ? ' at-zero' : '');

  return (
    <section className={className}>
      {formattedTime.split('').map((d, i) => 
        <span key={i}>{d}</span>
      )}
    </section>
  )
}
