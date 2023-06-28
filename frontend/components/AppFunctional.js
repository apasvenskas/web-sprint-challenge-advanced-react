import React, { useState } from "react";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
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
    x: 2,
    y: 2,
  });

  const [x, setX] = useState(2);
  const [y, setY] = useState(2);

  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(``);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
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
      index: initialIndex,
      x: 2,
      y: 2,
    });
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
    console.log(x);
  }

  function moveRight() {
    if (x < 3) {
      setX(x + 1);
    }
    console.log(x);
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
    if (x === 1) {
    }
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  function handleClickLeft() {
    moveLeft();
    onChange();
  }
  function handleClickRight() {
    moveRight();
    onChange();
  }
  function handleClickUp() {
    moveUp();
    onChange();
    if (y === 1) {
      setMessage(`You can't move up`);
    }
  }
  function handleClickDown() {
    moveDown();
    onChange();
  }

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
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
