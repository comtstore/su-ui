import React from "react";
import { ComponentProps } from "../../common/common.interface";

export interface LogoProps extends ComponentProps {
  /**
   * logo url
   */
  src?: string;
  /**
   * 自定义内容，如果src存在，则custom会在src显示的内容之后
   */
  custom?: false | React.ReactNode;
  /**
   * logo点击事件
   */
  onClick?: (e: any) => void;
}
