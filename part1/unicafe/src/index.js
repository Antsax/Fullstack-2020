import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.name}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
     <td> {text} </td>
     <td> {value}</td>
  </tr>
)

const Statistics = ({header, good, neutral, bad}) => {
  if (good + neutral + bad === 0) return (
    <div>
      <h1>{header}</h1>
      <p>No feedback given</p>
    </div>
  )

  return (
    <div>
      <h1>{header}</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} /> 
          <StatisticLine text="neutral" value={neutral} /> 
          <StatisticLine text="bad" value={bad} /> 
          <StatisticLine text="all" value={good + bad + neutral} /> 
          <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)} /> 
          <StatisticLine text="positive" value={good / (good + bad + neutral) * 100 + "%"} />
        </tbody> 
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button name="good" handleClick={() => setGood(good + 1)}/>
        <Button name="neutral" handleClick={() => setNeutral(neutral + 1)}/>
        <Button name="bad" handleClick={() => setBad(bad + 1)}/>
      </div>

      <Statistics header="statistics" good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(  <App />,
  document.getElementById('root')
)