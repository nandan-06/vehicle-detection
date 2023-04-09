import React, { Component } from "react";

import classes from "./Tables.module.css";

export class Tables extends Component {
  render() {
    let entries = [];

    for (let i = 0; i < this.props.trafficData.length; i++) {
      entries.push(
        <tr>
          <td>{i}</td>
          <td>{this.props.trafficData[i].location}</td>
          <td>{this.props.trafficData[i].noOfCar}</td>
          <td>{this.props.trafficData[i].label}</td>
          <td>{this.props.trafficData[i].timestamp}</td>
        </tr>
      );
    }

    return (
      <div className={classes.Container}>
        <div className={classes.Title}>Data Table of Traffic</div>
        <div className={classes.TableContainer}>
          <table className={classes.Table}>
            <thead>
              <tr>
                <th>id</th>
                <th>location</th>
                <th>vehicle count</th>
                <th>traffic label</th>
                <th>timestamp</th>
              </tr>
            </thead>
            <tbody>{entries}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Tables;
