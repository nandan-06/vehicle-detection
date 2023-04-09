import React from "react";

import classes from "./Navigation.module.css";
import logoImg from "./assets/logo.svg";

function Navigation() {
  return (
    <nav className={classes.Navigation}>
      <img className={classes.Logo} src={logoImg} alt="logo" />
      <div className={classes.Title}>Smart Traffic Management System</div>
    </nav>
  );
}

export default Navigation;
