/* eslint-disable no-unused-vars */
import React from 'react'
import { ComponentProps } from '../../common/common.interface'

export interface FileTreeItem { 
    [key: string]: any 
}

export enum FileTreeOperartion {
    DRAG = 'drag',
    CONTEXT_MENU = 'context_menu'
}

export interface FileTreeProps extends ComponentProps{
    /**
     * 所显示的文件树内容
     */
    items: Array<FileTreeItem>
    /**
     * key
     */
    itemKey: string
    /**
     * 表示label名的字段名
     */
    itemLabel?: string,
    /**
     * 激活元素
     */
    active?: Array<FileTreeItem>
    /**
     * 打开的文件夹元素
     */
    open?: Array<FileTreeItem>
    /**
     * 被禁用的元素
     */
    disabled?: Array<FileTreeItem>
    /**
     * 禁用所有叶子结点
     */
    disableLeaf?: boolean
    /**
     * 被禁用的操作
     */
    disabledOperation?: Array<FileTreeOperartion>,
    /**
     * 是否隐藏icon
     */
    noPrepend?: boolean,
    /**
     * 是否显示箭头
     */
    hideArrow?: boolean,
    /**
     * 无锁进
     */
    noIndent?: boolean,
    /**
     * classes
     */
    classes?: {
        /**
         * 给每个节点添加的样式
         */
        node?: string,
        /**
         * 被激活元素添加的样式
         */
        active?: string,
        /**
         * 被禁用元素添加的样式
         */
        disabled?: string,
    },
    /**
     * 节点的头部渲染组件
     */
    prependComponent?: (data: {
        item: FileTreeItem,
        open: Array<FileTreeItem>,
        active: Array<FileTreeItem>
    }) => JSX.Element,
    /**
     * 节点的内容部分渲染组件
     */
    labelComponent?: (data: {
        item: FileTreeItem,
        open: Array<FileTreeItem>,
        active: Array<FileTreeItem>
    }) => JSX.Element,
    /**
     * 底部添加的组件
     */
    bottomComponent?: React.ReactElement,
    /**
     * node被点击了
     * @param newActive 
     * @returns 
     */
    onTreeNodeClick?: ({ item, e }) => void
    /**
     * 文件夹箭头点击
     */
    onArrawClick?: () => void
    /**
     * 节点点击
     */
    onNodeClick?: () => void
    /**
     * 上下文菜单
     */
    onContextmenu?: () => void
    /**
     * node-contextmenu
     */
    onNodeContextmenu?: () => void,
    /**
     * 节点加载后的回调
     */
    onNodeMounted?: (item) => void,
    /**
     * 节点被打开时触发的回调
     * @param item 
     * @returns 
     */
    onNodeOpenChange?: (item, isOpen: boolean) => void,
    /**
    * open属性是否要改变
    * @param item 判断的item
    * @param isOpen 当前是否已经打开
    * @returns 
    */
    shouldNodeOpenChange?: (item, isOpen: boolean) => boolean | Promise<boolean>,
    /**
     * dragstart
     */
    onDragstart?: ({
        e,
        item,
        instance
    }) => void
    /**
     * dragover
     */
    onDragover?: ({
        e,
        item,
        instance
    }) => void
    /**
     * dragleave
     */
    onDragleave?: ({
        e,
        item,
        instance
    }) => void
    /**
     * drop
     */
    onDrop?: ({
        e,
        item,
        instance
    }) => void,
    /**
     * 打开上下文菜单
     * @param param0 
     * @returns 
     */
    onContextMenu?: ({ e, item }) => void
}