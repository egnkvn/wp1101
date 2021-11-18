import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const setstart = async () => {
    await startGame()
    setHasStarted(true)
  };

  const startMenu = (
    <div>
      <button onClick={setstart}>
        start game
      </button>
    </div>
  )

  const handleGuess = async () => {
    const response = await guess(number)

    if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={number}
        onChange={e => setNumber(e.target.value)}></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const setRestart = async () => {
    await restart()
    setHasWon(false)
    setStatus('')
    setNumber('')
  }

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={setRestart}>restart</button>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App;
