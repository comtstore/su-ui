import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { StatusTipItemConfig, StatusTipProps } from "./interface";
import RoundIcon from "../../assets/icons/round.svg";
import cx from "classnames";

function StatusTip(props: StatusTipProps) {
  const [isShowDesc, setIsShowDesc] = useState(true);
  const isShowDescTimeout: React.MutableRefObject<null | NodeJS.Timeout> =
    useRef(null);

  const clearIsShowDescTimeout = () => {
    // 清除原来的定时器
    isShowDescTimeout.current && clearTimeout(isShowDescTimeout.current);
    isShowDescTimeout.current = null;
  };

  useEffect(() => {
    clearIsShowDescTimeout();
    setIsShowDesc(true);
    const status = props.status;
    const index = props.items.findIndex((item) => item.name === status);
    if (index > -1) {
      const itemConfig: StatusTipItemConfig = props.items[index];
      if (itemConfig.duration && itemConfig.duration > 0) {
        isShowDescTimeout.current = setTimeout(() => {
          setIsShowDesc(false);
        }, itemConfig.duration);
      }
    }
  }, [props.status]);

  return (
    <div
      className={cx(
        "status-tip-item-container",
        props.className,
        props.classes?.root,
      )}
      style={{
        ...props.style,
        ...props.styles?.root,
      }}
    >
      {props.items.map((item: StatusTipItemConfig) => {
        if (props.status === item.name && !item.hidden) {
          return (
            <div
              className={cx("status-tip-item", props.classes?.item)}
              key={item.name}
              style={props.styles?.item}
            >
              <>
                {item.custom ? (
                  item.custom
                ) : (
                  <RoundIcon
                    width="14px"
                    height="14px"
                    color={item.color}
                    style={props.styles?.icon}
                  />
                )}
              </>
              <>
                {item.desc && isShowDesc ? (
                  <span
                    className={cx("desc", props.classes?.desc)}
                    style={{
                      color: item.color,
                      ...props.styles?.desc,
                    }}
                  >
                    {item.desc}
                  </span>
                ) : null}
              </>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default StatusTip;
