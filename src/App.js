import React from "react";
import { Component } from "react";
import './App.css';


class Timer extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            timeRemaining: 0, //in seconds
            seconds: 0,
            minutes: 0,
            hours: 0,
            timerActive: false,
            buttonPress: false
          };
          this.helperChange = this.helperChange.bind(this);
          this.helperSubmit = this.helperSubmit.bind(this);
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

        resetTime() {
          this.reset = this.setState({
            timeRemaining: (this.state.timeRemaining = 0),
            seconds: 0,
            minutes: 0,
            hours: 0,
            timerActive: false

          });
          clearInterval(this.countdown);
        }

        pauseButton() {
          clearInterval(this.countdown);
          this.setState({
            buttonPress: true
          });
        }

        startButton(){
          this.setState({
            buttonPress: false
          });
          this.startTimer();
        }

        startTimer() {
          var _this = this;
          this.countdown = setInterval(timer, 1000);
          function timer(){
            if (_this.state.timeRemaining > 0){
              _this.setState({ timeRemaining: _this.state.timeRemaining - 1 });
          }
            if (_this.state.timeRemaining == 0){
               _this.refs.audioBeep.play();
              _this.resetTime();
        }}
        }

        helperChange(event) {
          var num = parseInt(event.target.value, 10);
          var name = event.target.name;
          this.setState({ [name]: num });
        }

        helperSubmit(event) {
         event.preventDefault();
         var totalSeconds = (this.state.hours * 3600) + (this.state.minutes * 60) + (this.state.seconds);
         if (totalSeconds == 0){
           alert("Please type a value into the countdown timer");
           return;
         }
         this.setState({
           timeRemaining: totalSeconds,
             seconds: 0,
             minutes: 0,
             hours: 0,
             timerActive: true  });
             this.helper();
       }

        helper(){
         this.startTimer();
       }

        render() {
          return (
            <div>
            <h1 className = "TimerTitle">Countdown Timer </h1>
            <audio ref= "audioBeep" preload = "auto" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"/>

              <div>
              {(this.state.timerActive == false) ?
                <div class="form-container">
                  <form class = "numinput" onSubmit={this.helperSubmit}>
                  <input type="text" name= "hours" pattern="\d*" autocomplete="off" onChange={this.helperChange} placeholder="00"/>:
                  <input type="text" maxLength= "2" pattern="\d*" name="minutes" autocomplete="off" onChange={this.helperChange} placeholder="00"/>:
                  <input type="text" maxLength= "2" pattern="\d*" name="seconds" autocomplete="off" onChange={this.helperChange} placeholder="00"/>
                  <div class= "btn">
                  <input type="submit" value="Start"/>
                  </div>
                  </form>

                </div>
                :
                <div className = "clocktimer">
              <div className= "clock">{this.getHours()}:{this.getMinutes()}:{this.getSeconds()}
              <div className= "btn">
              {this.state.buttonPress ? <button onClick={() => this.startButton()}>Start</button> : <button onClick={() => this.pauseButton()}>Pause</button>}
              <button onClick={() => this.resetTime()}>Reset</button>
              </div>
                </div>

              </div>
            }
              </div>
            </div>
          );
        }
      }


class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer />
      </div>
    ); }};

export default App;
