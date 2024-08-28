import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { ButtonProps } from "./interface";
import ButtonController from "./controller";
import { useObserver } from "mobx-react";
import "./index.scss";

function Button(props: PropsWithChildren<ButtonProps>) {
  const [controller] = useState(() => new ButtonController());
  useEffect(() => {
    controller.updateProps(props);
  }, [props]);

  useEffect(() => {
    ["click", "touchstart"].forEach((eventname) => {
      window.addEventListener(eventname, controller.triggerCallback);
    });
    return () => {
      ["click", "touchstart"].forEach((eventname) => {
        window.removeEventListener(eventname, controller.triggerCallback);
      });
    };
  }, []);

  return useObserver(() => (
    <button
      ref={(ref) => controller.updateRef(ref)}
      disabled={props.disabled}
      className={cx(
        "su-button",
        "su-button-" + (props.type ?? "contained"),
        "su-button-" + (props.size ?? "medium"),
        {
          "su-button-block": props.block,
          "su-button-activate": controller.isTriggerred,
          "su-button-disabled": props.disabled,
        },
        props.className,
        props.classes?.button,
      )}
      style={{
        ...props.style,
        ...props.styles?.button,
      }}
      onClick={props.onClick}
      onTouchStart={props.onTouchStart}
      onMouseOver={controller.onMouseOver}
      onMouseLeave={controller.onMouseLeave}
    >
      <div
        className={cx({
          "su-button__content": true,
          "hide-content":
            props.onlyShowContentOnHover && !controller.isMouseover,
        })}
      >
        {props.children}
      </div>
    </button>
  ));
}

export default Button;
