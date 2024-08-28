import React from "react";
import "./index.scss";
import cx from "classnames";
import { LogoProps } from "./interface";

function Logo(props: LogoProps) {
  return (
    <div
      className={cx("logo-container", props.className)}
      onClick={props.onClick}
    >
      {props.src && <img src={props.src} alt="logo" />}
      {props.custom}
    </div>
  );
}

export default Logo;
