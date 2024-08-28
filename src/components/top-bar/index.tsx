import React from "react";
import { MenuItem, TopBarProps, ToolItem } from "./interface";
import { useObserver, useLocalStore } from "mobx-react";
import cx from "classnames";
import "./index.scss";

function TopBar(props: TopBarProps) {
  const store = useLocalStore(
    () => ({
      get maxWidth_str() {
        if (props.maxWidth === undefined) {
          return "none";
        } else if (typeof props.maxWidth === "number") {
          return props.maxWidth + "px";
        } else if (typeof props.maxWidth === "string") {
          return props.maxWidth;
        } else if (typeof props.maxWidth === "boolean") {
          return "none";
        }
      },
    }),
    props,
  );

  const renderHeaderLeft = (): React.ReactNode => {
    let headerLinkGroupItemList: Array<React.ReactNode> | null = null;
    if (props.menu) {
      headerLinkGroupItemList = props.menu.map((menuItem: MenuItem) => {
        return (
          <div
            key={menuItem.key}
            className={cx("header-link-group-item", "tc1")}
          >
            {menuItem.name || menuItem.key}
          </div>
        );
      });
    }
    return (
      <div className="header-left">
        <div className="header-link-group">{headerLinkGroupItemList}</div>
      </div>
    );
  };

  const renderHeaderRight = (): React.ReactNode => {
    return (
      <div className="header-right">
        {props.tools
          ? props.tools.map((toolItem: ToolItem, index: number) => {
              if (toolItem.hidden) return;
              return (
                <div key={toolItem.key ?? index} className="header-right-item">
                  {toolItem.content}
                </div>
              );
            })
          : null}
      </div>
    );
  };

  return useObserver(() => (
    <div className="header-container" style={props.styles}>
      <div
        className="header-body-container"
        style={{
          maxWidth: store.maxWidth_str,
        }}
      >
        <div className="logo">{props.logo}</div>
        {renderHeaderLeft()}
        {renderHeaderRight()}
        {props.user}
      </div>
    </div>
  ));
}

export default TopBar;
