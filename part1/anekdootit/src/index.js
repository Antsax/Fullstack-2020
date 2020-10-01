import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const MostVotes = ({anecdotes, points}) => {
  const indexOfHighest = points.indexOf(Math.max(...points))
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indexOfHighest]} <br/>
      has {points[indexOfHighest]} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(props.points)

  const handlePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <br/>
      <Button text="vote" handleClick={handlePoints} />
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random() * 6))} />

      <MostVotes anecdotes={anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(6).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)