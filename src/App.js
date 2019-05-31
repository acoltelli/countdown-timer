import React from "react";
import { Component } from "react";
import './App.css';


class CountdownTimer extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            timeRemaining: 0,
            seconds: 0,
            minutes: 0,
            hours: 0
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
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

        handleChange(event) {
          var num = parseInt(event.target.value, 10);
          var name = event.target.name;
          this.setState({ [name]: num });
        }

        handleSubmit(event) {
         event.preventDefault();
         var totalSeconds = (this.state.hours * 3600) + (this.state.minutes * 60) + (this.state.seconds);
         this.setState({timeRemaining: totalSeconds});
       }

        render() {
          return (

            <div>
            <h2 className = "TimerTitle">Countdown Timer </h2>

              <div className="clock">
                {this.state.hours}:{this.state.minutes}:{this.state.seconds}
                <h1/>
                Actual timer : {this.getHours()}:{this.getMinutes()}:{this.getSeconds()}

                <form onSubmit={this.handleSubmit}>
                <input type="number" name="hours" onChange={this.handleChange} placeholder="00"/>:
                <input type="number"  min="00" max="59" name="minutes" onChange={this.handleChange} placeholder="00"/>:
                <input type="number" min="00" max="59" name="seconds" onChange={this.handleChange} placeholder="00"/>
                <input type="submit" value="Submit" />
                </form>

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
