import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const colorPalette = ["#FEA47F", "#25CCF7", "#EAB543", "#55E6C1", "#CAD3C8",
                "#F97F51", "#1B9CFC", "#F8EFBA", "#58B19F", "#2C3A47",
                "#B33771", "#3B3B98", "#FD7272", "#9AECDB", "#D6A2E8",
                "#6D214F", "#182C61", "#FC427B", "#BDC581", "#82589F"];

let descend = false;

class Button extends React.Component {
  constructor() {
    super();
    this.generateDiv = this.generateDiv.bind(this);
  }

  generateDiv() {
    this.props.onAddDiv(this.props.count);
    this.props.startTimer();
  }

  render() {
    return (
      <div>
        <button
          onClick={this.generateDiv}
        >
          Generate Divs!
        </button>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.divList = [];

    this.state = {
      showButton: true,
      divCount: 0,
      myDivs: this.divList
    }
    this.onAddDiv = this.onAddDiv.bind(this);
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {
    this.intervalId = setInterval(this.timer, 125);
  }

  timer() {
    if (this.state.divCount <= 99 && descend) {
      this.divList.pop();
      this.setState({
        myDivs: this.divList,
        divCount: this.state.divCount - 1
      })
        if (this.state.divCount === 0) {
          descend = false;
        }
    } else if (this.state.divCount <= 99) {
      this.onAddDiv(this.state.divCount);
        if (this.state.divCount === 99) {
          descend = true;
        }
    }
  }



  onAddDiv(number) {
    const divNum = Math.floor(Math.random() * (colorPalette.length)) + 1;
    const divClass = "block" + " " + "color" + divNum;
    const divElem = <div className={divClass} key={number}></div>;
    this.divList.push(divElem);
    this.setState({
      startTimer: true,
      myDivs: this.divList,
      divCount: this.state.divCount + 1,
      showButton: false
    })
  }

  render() {
    const { showButton, divCount, myDivs } = this.state;
    let button = null;
    if (showButton) {
      button = <Button
                onAddDiv={this.onAddDiv}
                startTimer={this.startTimer}
                count={divCount}
                showButton={showButton}
               />;
    }
    return (
      <div className="App">
        {button}
        {myDivs.map(item => item)}
      </div>
    );
  }
}

export default App;
