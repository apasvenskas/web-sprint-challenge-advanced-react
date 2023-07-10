import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
  });

  const [x, setX] = useState(2);
  const [y, setY] = useState(2);

  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(initialMessage);
  // const [presCount, setPressCount] = useState(0);

  function displayMessage(event) {
    const direction = event.target.id;
    if (direction === "left" && x === 1) {
      setMessage(`You can't go left`);
    } else if (direction === "right" && x === 3) {
      setMessage(`You can't go right`);
    } else if (direction === "up" && y === 1) {
      setMessage(`You can't go up`);
    } else if (direction === "down" && y === 3) {
      setMessage(`You can't go down`);
    } else {
      setMessage("");
      // setPressCount(0);
    }
    // console.log(message);
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
    setMessage("");
    // setPressCount(0);
    // console.log(message, email, steps, x, y);
  }

  function moveLeft() {
    if (x > 1) {
      setX(x - 1);
    }
    // console.log(x);
  }

  function moveRight() {
    if (x < 3) {
      setX(x + 1);
    }
    // console.log(x);
  }

  function moveDown() {
    if (y < 3) {
      setY(y + 1);
    }
    // console.log(y);
  }
  function moveUp() {
    if (y > 1) {
      setY(y - 1);
    }
    // console.log(y);
  }

  function onChange(event) {
    const direction = event.target.id;
    // You will need this to update the value of the input.
    if (x === 1 && direction === "left") {
      setCount(count);
    } else if (x === 3 && direction === "right") {
      setCount(count);
    } else if (y === 1 && direction === "up") {
      setCount(count);
    } else if (y === 3 && direction === "down") {
      setCount(count);
    } else {
      setCount(count + 1);
    }
  }

  function handleClickLeft(event) {
    displayMessage(event);
    moveLeft();
    onChange(event);
  }
  function handleClickRight(event) {
    displayMessage(event);
    moveRight();
    onChange(event);
  }
  function handleClickUp(event) {
    displayMessage(event);
    moveUp();
    onChange(event);
  }
  function handleClickDown(event) {
    displayMessage(event);
    moveDown();
    onChange(event);
  }

  const handleEmailChange = (e) => {
    setState({ ...state, email: e.target.value });
  };

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, steps } = state;
    if (email === "") {
      setMessage("Ouch: email is required");
      return;
    }

    if(!emailRegex.test(email)){
      setMessage("Ouch: email must be a valid email");
      return;
    }

    axios
      .post("http://localhost:9000/api/result", { email, steps, x, y })
      .then((response) => {
        // need to format the winning message.
        setMessage(response.data.message);
        setState({ ...state, email: "" });
        console.log(response.data.message);
      })
      
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // const number = Math.floor(Math.random() * 100) + 1;
          setMessage(error.response.data.message); //`foo@bar.baz failure #71`
          setState({ ...state, email: "" });
        } else {
          setMessage(`Something went wrong: ${error / message}`);
         
        }
      });
      console.log('message', message);
    // console.log(message);
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates"> Coordinates ({`${x}, ${y}`})</h3>
        <h3 id="steps">
          You moved {count === 1 ? "1 time" : `${count} times`}
        </h3>
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
        <button id="left" onClick={handleClickLeft}>
          LEFT
        </button>
        <button id="up" onClick={handleClickUp}>
          UP
        </button>
        <button id="right" onClick={handleClickRight}>
          RIGHT
        </button>
        <button id="down" onClick={handleClickDown}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={state.email}
          onChange={handleEmailChange}
        ></input>
        <input id="submit" type="submit" onClick={handleSubmit}></input>
      </form>
    </div>
  );
}
