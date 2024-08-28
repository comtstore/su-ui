import { IComponentProps } from "../../common/common.interface";
import { MouseEvent, TouchEvent } from "react";

export interface ButtonProps extends IComponentProps {
  /**
   * 类型
   */
  type?: "text" | "outlined" | "contained" | "icon";
  /**
   * 尺寸
   */
  size?: "small" | "medium" | "large";
  /**
   * 只在hover时展示内容
   */
  onlyShowContentOnHover?: boolean;
  /**
   * 占满全部宽度
   */
  block?: boolean;
  /**
   * disabled
   */
  disabled?: boolean;
  /**
   * classes
   */
  classes?: {
    button?: string;
  };
  /**
   * styles
   */
  styles?: {
    button?: React.CSSProperties;
  };
  /**
   * 点击事件
   */
  onClick?: (event: MouseEvent<any>) => void;
  /**
   * touchstart事件
   */
  onTouchStart?: (event: TouchEvent<any>) => void;
}
