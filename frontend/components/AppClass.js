import React, { Component } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      x: 2,
      y: 2,
      count: 0,
      presCount: 0,
    };
  }

  displayMessage = (event) => {
    const { x, y } = this.state;
    const direction = event.target.id;
    if (direction === 'left' && x === 1) {
      this.setState({ message: `You can't go left`});
    } else if (direction === 'right' && x === 3) {
      this.setState({ message: `You can't go right` });
    } else if (direction === 'up' && y === 1) {
      this.setState({ message: `You can't go up` });
   } else if (direction === 'down' && y === 3) {
    this.setState({ message: `You can't go down` });
   } else {
    this.setState({ message: '', presCount: 0 });
   }
   console.log(this.state.message);
  }
 

  reset = () => {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
      x: 2,
      y: 2,
      count: 0,
      presCount: 0,
    });
    console.log(this.state.message, this.state.email, this.state.steps, this.state.x, this.state.y);
  }; 

  moveLeft = () => {
    const {x} = this.state;
    if (x > 1) {
      this.setState({x: x-1});
    }
    console.log(this.state.x, this.state.message);
  };

  moveRight = () => {
    const {x} = this.state;
    if (x < 3) {
      this.setState({x: x+1});
    }
    console.log(this.state.x, this.state.message);
  }

  moveUp = () => {
    const {y} = this.state;
    if (y > 1) {
      this.setState({y: y-1});
    }
    console.log(this.state.y, this.state.message);
  }

  moveDown = () => {
    const {y} = this.state;
    if (y < 3) {
      this.setState({y: y + 1});
    }
    console.log(this.state.y);
  }

  onChange = (event) => {
    const { x, y, count } = this.state;
    const direction = event.target.id;
    if (x === 1 && direction === 'left') {
      this.setState({count});
    } else if ( x===3 && direction === 'right') {
      this.setState({count});
    } else if ( y===1 && direction === 'up') {
      this.setState({count});
    } else if ( y===3 && direction === 'down') {
      this.setState({count});
    } else {
      this.setState({count: count + 1});
    }
  };
 
  handleClickLeft = (event) => {
    this.displayMessage(event);
    this.moveLeft();
    this.onChange(event); 
  }
  handleClickRight = (event) => {
    this.displayMessage(event);
    this.moveRight();
    this.onChange(event); 
  }
  handleClickUp = (event) => {
    this.displayMessage(event);
    this.moveUp();
   this.onChange(event); 
  }
  handleClickDown = (event) => {
    this.displayMessage(event);
    this.moveDown();
    this.onChange(event); 
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

   handleSubmit = (e) => {
    e.preventDefault();
    const { email, steps, x, y } = this.state;
    if (email === "") {
      this.setState({
        message: `Ouch: email is required`
      }) 
      return;
    }
  

     axios.post(
        "http://localhost:9000/api/result",
        { email, steps, x, y }
      ).then(response => {
         // need to format the winning message. 
      this.setState ({
        message: response.data.message
        // response.data.message
      })
      })
     
     .catch (error => {
      this.setState({
        message: `Something went wrong: ${error.message}`
      })
     }) 

    console.log(message);
  };

  render() {
    const { className } = this.props
    const { x, y, count, message, email} = this.state
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({`${x}, ${y}`})</h3> 
          <h3 id="steps">You moved {count === 1 ? '1 time': `${count} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === (y - 1) * 3 + x - 1 ? " active" : ""}`}
              >
                {idx === (y - 1) * 3 + x - 1 ? "B" : null}
              </div>
            ))
          }
        </div>
        <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={this.handleClickLeft}>
          LEFT
        </button>
        <button id="up" onClick={this.handleClickUp}>
          UP
        </button>
        <button id="right" onClick={this.handleClickRight}>
          RIGHT
        </button>
        <button id="down" onClick={this.handleClickDown}>
          DOWN
        </button>
        <button id="reset" onClick={this.reset}>
          Reset
        </button>
      </div>
      <form>
        <input id="email" type="email" 
          placeholder="type email" 
          value={email} 
          onChange={this.handleEmailChange} 
        ></input>
        <input 
          id="submit"
          type="submit" 
          onClick={this.handleSubmit}
        >
        </input>
      </form>
    </div>
    )
  }
}
