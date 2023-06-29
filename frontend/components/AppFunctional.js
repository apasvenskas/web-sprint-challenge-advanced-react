import React, { useEffect, useState } from "react";
import axios from "axios";


// Suggested initial states
const initialMessage = "";
const initialEmail = "email@email.com";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
  });

  const [x, setX] = useState(2);
  const [y, setY] = useState(2);

  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(``);
  const [presCount, setPressCount] = useState(0);

  // function getXY() {
  //   // It it not necessary to have a state to track the coordinates.
  //   // It's enough to know what index the "B" is at, to be able to calculate them.
  // }

  // function getXYMessage() {
  //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
  //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
  //   // returns the fully constructed string.
  // }

  function displayMessage() {
    if (x === 1 && (y === 1 || y === 2 || y === 3)) {
      setPressCount(presCount + 1)
      if(presCount >= 1){
        setMessage(`You can't move left`);
      }
    } else if (x === 3 && (y === 1 || y === 2 || y === 3)) {
      setPressCount(presCount+ 1)
      if(presCount >= 1){
      setMessage(`You can't move right`);
      }
    } else if (y === 1 && (x === 1 || x === 2 || x === 3)) {
      setPressCount(presCount + 1)
      if(presCount >= 1){
      setMessage(`You can't move up`);
      }
    } else if (y === 3 && (x === 1 || x === 2 || x === 3)) {
      setPressCount(presCount + 1)
      if(presCount >= 1){
      setMessage(`You can't move down`);
      }
    } else {
      setMessage('');
      setPressCount(0);
    }
    console.log(message);
  }

  function reset() {
    // Use this helper to reset all states to their initial values.

    setState({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    });
    setX(2);
    setY(2);
    setCount(0);
    setMessage('');
    setPressCount(0);
    console.log(message, email, steps, x, y);
  }

  // function getNextIndex(direction) {
  //   // This helper takes a direction ("left", "up", etc) and calculates what the next index
  //   // of the "B" would be. If the move is impossible because we are at the edge of the grid,
  //   // this helper should return the current index unchanged.
  // }

  function moveLeft() {
    if (x > 1) {
      setX(x - 1);
    }
    console.log(x, message);
  }

  function moveRight() {
    if (x < 3) {
      setX(x + 1);
    }
    console.log(x, message);
  }

  function moveDown() {
    if (y < 3) {
      setY(y + 1);
    }
    console.log(y);
  }
  function moveUp() {
    if (y > 1) {
      setY(y - 1);
    }
    console.log(y);
  }

  // function move(evt) {
  //   // This event handler can use the helper above to obtain a new index for the "B",
  //   // and change any states accordingly.

  // }

  function onChange() {
    // You will need this to update the value of the input.
    if (x) {
      setCount(count + 1);
    }
    if (y) {
      setCount(count + 1);
    }
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  function handleClickLeft() {
    displayMessage();
    moveLeft();
    onChange();
  }
  function handleClickRight() {
    displayMessage();
    moveRight();
    onChange();
  }
  function handleClickUp() {
    displayMessage();
    moveUp();
    onChange();
  }
  function handleClickDown() {
    displayMessage();
    moveDown();
    onChange();
  }

  const handleEmailChange = (e) => {
    setState({...state, email: e.target.value});
  };
  const handleSubmit = async () => {
    //validate email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(!emailRegex.test(state.email)){
      setMessage("Ouch: email must be valid email");
      return; 
    }
    const payload = {
      x: x,
      y: y,
      steps: state.steps.length,
      email: state.email,
  };
  // //  for Post request with axios. 
  try{
    const response = await axios.post(
      "http://localhost:9000/api/results",
      payload
    );
    setMessage(`${state.email}, win ${response.data}`);
  } catch(error){
    setMessage(`Something went wrong: {error/message}`);
  }
};


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`${x}, ${y}`}</h3>
        <h3 id="steps">You moved {count} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === (y - 1) * 3 + x - 1 ? " active" : ""}`}
          >
            {idx === (y - 1) * 3 + x - 1 ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={handleClickLeft} disabled={x === 1}>
          LEFT
        </button>
        <button id="up" onClick={handleClickUp} disabled={y === 1}>
          UP
        </button>
        <button id="right" onClick={handleClickRight} disabled={x === 3}>
          RIGHT
        </button>
        <button id="down" onClick={handleClickDown} disabled={y === 3}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>
      <form>
        <input id="email" type="email" 
          placeholder="type email" 
          value={state.email} 
          onChange={handleEmailChange} 
        ></input>
        <input 
          id="submit"
          type="submit" 
          onClick={handleSubmit}
        >
        </input>
      </form>
    </div>
  );
}
