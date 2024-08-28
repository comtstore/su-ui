import React from "react";
import { ComponentProps } from "../../common/common.interface";

export interface FileTreeItem {
  [key: string]: any;
}

export enum FileTreeOperartion {
  DRAG = "drag",
  CONTEXT_MENU = "context_menu",
}

export interface FileTreeNodeProps extends ComponentProps {
  /**
   * 所显示的节点内容
   */
  item: FileTreeItem;
  /**
   * level, 节点深度
   */
  level?: number;
  /**
   * 表示label名的字段名
   */
  itemLabel?: string;
  /**
   * children的字段
   */
  itemChildren?: string;
  /**
   * 指明类型的字段
   */
  itemType?: string;
  /**
   * item[itemType] === folderType表明节点是文件夹
   */
  folderType?: string;
  /**
   * item上的哪个字段作为key
   */
  itemKey: string;
  /**
   * 激活元素
   */
  active?: Array<FileTreeItem>;
  /**
   * 打开的文件夹元素
   */
  open?: Array<FileTreeItem>;
  /**
   * 被禁用的元素
   */
  disabled?: Array<FileTreeItem>;
  /**
   * 禁用所有叶子结点
   */
  disableLeaf?: boolean;
  /**
   * 被禁用的操作
   */
  disabledOperation?: Array<FileTreeOperartion>;
  /**
   * 是否隐藏前缀
   */
  noPrepend?: boolean;
  /**
   * 是否显示箭头
   */
  hideArrow?: boolean;
  /**
   * 无锁进
   */
  noIndent?: boolean;
  /**
   * classes
   */
  classes?: {
    /**
     * 给每个节点添加的样式
     */
    node?: string;
    /**
     * 被激活元素添加的样式
     */
    active?: string;
    /**
     * 被禁用元素添加的样式
     */
    disabled?: string;
  };
  /**
   * 节点的头部渲染组件
   */
  prependComponent?: (data: {
    item: FileTreeItem;
    open: Array<FileTreeItem>;
    active: Array<FileTreeItem>;
  }) => JSX.Element;
  /**
   * 节点的内容部分渲染组件
   */
  labelComponent?: (data: {
    item: FileTreeItem;
    open: Array<FileTreeItem>;
    active: Array<FileTreeItem>;
  }) => JSX.Element;
  /**
   * 底部添加的组件
   */
  bottomComponent?: React.ReactElement;
  /**
   * node被点击了
   * @param newActive
   * @returns
   */
  onTreeNodeClick?: ({ item, e }) => void;
  /**
   * 打开上下文菜单
   * @param param0
   * @returns
   */
  onContextMenu?: ({ e, item }) => void;
  /**
   * 节点加载后的回调
   */
  onMounted?: (item) => void;
  /**
   * 节点被打开时触发的回调
   * @param item
   * @returns
   */
  onOpenChange?: (item, isOpen: boolean) => void;
  /**
   * open属性是否要改变
   * @param item 判断的item
   * @param isOpen 当前是否已经打开
   * @returns
   */
  shouldOpenChange?: (item, isOpen: boolean) => boolean | Promise<boolean>;
  /**
   * dragstart
   */
  onDragstart?: ({ e, item, instance }) => void;
  /**
   * dragover
   */
  onDragover?: ({ e, item, instance }) => void;
  /**
   * dragleave
   */
  onDragleave?: ({ e, item, instance }) => void;
  /**
   * drop
   */
  onDrop?: ({ e, item, instance }) => void;
}
