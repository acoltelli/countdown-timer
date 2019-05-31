import React from "react";
import { Component } from "react";
import './App.css';


class CountdownTimer extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            timeRemaining: 0,

          };
        }

        increaseTimer(){
          this.setState({timeRemaining: this.state.timeRemaining + 60})
        }

        decreaseTimer(){
          if (this.state.timeRemaining > 0)  {
            this.setState({timeRemaining: this.state.timeRemaining - 60})
          }

        }

        getHours() {
          return ("0" + Math.floor(this.state.timeRemaining / 3600)).slice(-2);
        }

        getMinutes() {
          return ("0" + Math.floor((this.state.timeRemaining % 3600) / 60)).slice(-2);
        }

        getSeconds() {
          return ("0" + (this.state.timeRemaining % 60)).slice(-2);
        }

        startTimer() {
          var _this = this;
          this.countdown = setInterval(dec, 1000); //decrements timeRemaining by one every 1000ms.
          function dec(){
            if (_this.state.timeRemaining > 0){
            _this.setState({ timeRemaining: _this.state.timeRemaining - 1 });
          }
          //clear timer when count is zero
          if (_this.state.timeRemaining == 0){
          clearInterval(this.countdown);
        }}
        }

        resetTime() {
          this.reset = this.setState({
            timeRemaining: (this.state.timeRemaining = 0)
          });
          clearInterval(this.countdown);
        }

        pauseTime() {
          clearInterval(this.countdown);
        }


        render() {
          return (

            <div>
            <h2 className = "TimerTitle">Countdown Timer </h2>

              <div className="clock">
                <h1/>
                {this.getHours()}:{this.getMinutes()}:{this.getSeconds()}

              </div>

              <div className = "buttonPanel">
              <button onClick={() => this.startTimer()}>Start</button>
              <button onClick={() => this.pauseTime()}>Pause</button>
              <button onClick={() => this.resetTime()}>Reset</button>
              </div>
            </div>
          );
        }
      }




class App extends Component {
  render() {
    return (
      <div className="App">
        <CountdownTimer />
      </div>
    ); }};


export default App;
