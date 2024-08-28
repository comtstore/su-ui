import { Component } from "react";
import { ComponentProps } from "../../common/common.interface";

type TIcon = any;

export interface MenuListItem {
  name?: string | (() => string);
  icon?: TIcon;
  hide?: () => boolean;
  append?: Component;
  /**
   * 是否是空白
   */
  blank?: boolean;
}

export interface MenuListProps extends ComponentProps {
  /**
   * menuList的方向
   */
  direction: "parallel" | "vertical";
  /**
   * 菜单项的尺寸，主要调整文字的尺寸，默认medium
   */
  size?: "large" | "medium" | "small";
  /**
   * 所有选项
   */
  items: Array<MenuListItem>;
  /**
   * key
   */
  itemKey: string;
  /**
   * label
   */
  itemLabel?: string;
  /**
   * 激活的项目item
   */
  active?: MenuListItem | Array<MenuListItem> | null;
  /**
   * icon组件的渲染器
   */
  iconComponent?: (icon: TIcon, item?: MenuListItem) => any;
  /**
   * 项目被点击
   */
  onItemClick?: (item: MenuListItem) => void;
}
