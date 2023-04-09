// Import dependencies
import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import classes from "./App.module.css";
import trafficVideo from "./assets/traffic.mp4";

import Navigation from "./Navigation";
import Tables from "./Tables";
import ArrowIcon from "./assets/arrow.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      loaded: false,
      model: null,
      interval: null,
      location: null,
      trafficData: [],
    };
  }

  componentDidMount() {
    this.runCoco();
  }

  addTrafficData = (location, data) => {
    if (data && data.length !== 0) {
      let noOfCar = data.filter((obj) => obj.class === "car").length;

      let previosLable =
        this.state.trafficData.length !== 0
          ? this.state.trafficData[this.state.trafficData.length - 1].label
          : null;

      if (noOfCar < 13 && previosLable !== "Low") {
        let newArr = [...this.state.trafficData];
        newArr.push({
          location: location,
          noOfCar: noOfCar,
          timestamp: Date.now(),
          label: "Low",
        });
        this.setState({ trafficData: newArr });
      } else if (noOfCar >= 15 && noOfCar < 20 && previosLable !== "Medium") {
        let newArr = [...this.state.trafficData];
        newArr.push({
          location: location,
          noOfCar: noOfCar,
          timestamp: Date.now(),
          label: "Medium",
        });
        this.setState({ trafficData: newArr });
      } else if (noOfCar >= 20 && previosLable !== "High") {
        let newArr = [...this.state.trafficData];
        newArr.push({
          location: location,
          noOfCar: noOfCar,
          timestamp: Date.now(),
          label: "High",
        });
        this.setState({ trafficData: newArr });
      }
    }
  };

  detect = async (net) => {
    let video = this.videoRef.current;
    const obj = await net.detect(video);
    this.addTrafficData(this.state.location, obj);
  };

  runCoco = async () => {
    const net = await cocossd.load();
    this.setState({
      model: net,
      loaded: true,
    });
  };

  videoPlayHandler = () => {
    let interval = setInterval(() => {
      this.detect(this.state.model);
    }, 10);
    this.setState({
      interval: interval,
    });
  };

  videoPauseHandler = () => {
    clearInterval(this.state.interval);
  };

  onInputHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  onSubmitHandler = () => {
    if (this.state.location && this.state.loaded) {
      this.videoRef.current.play();
    } else {
      this.videoRef.current.pause();
    }
  };

  render() {
    return (
      <div className={classes.App}>
        <Navigation />
        <div className={classes.VideoContainer}>
          <div className={classes.DataInput}>
            <div className={classes.Tag}>
              {!this.state.loaded ? (
                <div className={classes.ldsring}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : null}

              {!this.state.loaded ? "Model is Loading..." : "Loading Completed"}
            </div>

            <div className={classes.Title}>
              Traffic Feed{" "}
              <img className={classes.Arrow} src={ArrowIcon} alt="arrow" />{" "}
              <br />
              <span className={classes.SubTitle}> of Perticular Location</span>
            </div>
            <div className={classes.Location}>
              <div>
                <input
                  onInput={(e) => this.onInputHandler(e)}
                  className={classes.LocationInput}
                  placeholder="Enter location"
                />
                <button
                  onClick={this.onSubmitHandler}
                  className={classes.Button}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
          <div className={classes.Video}>
            <video
              onPlay={this.videoPlayHandler}
              onPause={this.videoPauseHandler}
              ref={this.videoRef}
              height={500}
            >
              <source src={trafficVideo} />
            </video>
          </div>
        </div>
        <Tables trafficData={this.state.trafficData} />
      </div>
    );
  }
}

export default App;
