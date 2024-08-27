import React, { useState, useEffect, useRef } from 'react';

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(60);

    return (
        <div>
            <h1>Nedräkningstimer</h1>
            <h2>{timeLeft} sekunder kvar</h2>
            <button>Starta</button>
            <button>Pausa</button>
            <button>Återställ</button>
        </div>
    );
}

export default CountdownTimer;