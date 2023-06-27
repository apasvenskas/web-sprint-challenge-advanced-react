import React, { useState } from 'react'
import { array } from 'yup'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at



export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState ({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex
  })

   const [x, setX] = useState(2);
   const [y, setY] = useState(2);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    setX = [1, 2, 3]
    setY = [1, 2, 3]
    for (let i = 0; i < setX.length; i++) {
      const xIndex = setX[i].indexOf("B");
      if (xIndex !== -1) {
        return {x: xIndex, y: i};
      }
    }
    return {x: -1, y: -1}
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    
    setState({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex
    })
    console.log(message, email, steps)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  const onClickHandler = ((e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left || e.clientX + rect.right; 
    const y = e.clientY - rect.up || e.clientY + rect.down;
    setX(x);
    setY(y);
    console.log(x, y);
  })

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXY()}</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={onClickHandler}>LEFT</button>
        <button id="up" onClick={onClickHandler}>UP</button>
        <button id="right" onClick={onClickHandler}>RIGHT</button>
        <button id="down" onClick={onClickHandler}>DOWN</button>
        <button id="reset" onClick={reset}>Reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
