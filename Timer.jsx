import {useState, useEffect} from "react";

function Timer() {
    const [time, setTime] = useState(120000);
    const [originalTime, setOriginalTime] = useState(120000);
    const [isRunning, setIsRunning] = useState(false);

    const [showSetTimer, setShowSetTimer] = useState(false);
    const [minutesInput, setMinutesInput] = useState("");
    const [secondsInput, setSecondsInput] = useState("");


    useEffect(() => {
       if(!isRunning){
        return;
       }
       
        const timer = setInterval(() => {
            setTime((currentTime) => {
                if(currentTime <= 1){
                    return 0;
            } 
            return currentTime - 10;
        });
    }, 10);

        return () => clearInterval(timer);
    },[isRunning]);

        useEffect(() => {
            if(time === 0){
                setIsRunning(false);
        }
        },[time]);

    const setTimer = () => {
        const minutes = Number(minutesInput) || 0;
        const seconds = Number(secondsInput) || 0;

        if(minutes < 0 || seconds < 0 || seconds >59){
            return;
        }
        const totalSeconds = ((minutes * 60) + seconds)*1000;

        setOriginalTime(totalSeconds);
        setTime(totalSeconds);
        setIsRunning(false);
        setShowSetTimer(false);
    }

    const resetTimer = () => {
        setTime(originalTime);
        setIsRunning(false);
        setShowSetTimer(false);
    }

    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return (
        <div className="top">
            <div id="timer">
               <h1 id="time">
                    {minutes}:{String(seconds).padStart(2, "0")}:
                    {String(milliseconds).padStart(2, "0")}
                </h1>

                <div id="buttons">
                    <button onClick= { () => setIsRunning(true)}>Start</button>
                    <button onClick= {() => setShowSetTimer(true)}>Set</button>
                    <button onClick= { () => setIsRunning(false)}>Stop</button>
                    <button onClick = {() => resetTimer()}>Reset</button>
                </div>
                {showSetTimer && (
                    <div id="setTimer">
                        <input
                            type="number"
                            placeholder="Minutes"
                            value={minutesInput}
                            onChange={(e) => setMinutesInput(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Seconds"
                            value={secondsInput}
                            onChange={(e) => setSecondsInput(e.target.value)}
                        />

                        <button onClick={setTimer}>
                            Set Timer
                        </button>

                        <button onClick={() => setShowSetTimer(false)}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Timer;