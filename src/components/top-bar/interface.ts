/* eslint-disable no-unused-vars */
import React from "react"
import { ComponentProps } from '../../common/common.interface'

export enum MenuItemType {
    /**
     * 路由类型，点击后跳转到对应路由
     */
    ROUTER = 'router',
}

export interface MenuItem {
    /**
     * key
     */
    key: string,
    /**
     * 内容，如果不传递，会用key代替
     */
    content?: any,
    /**
     * 菜单名称，如果不传递，会用key进行代替
     */
    name?: string | React.ReactNode,
    /**
     * 子菜单, 目前不可用
     */
    children?: Array<MenuItem>,
    /**
     * 类型
     */
    type?: MenuItemType,
    /**
     * menu的选中项
     */
    select?: string,
    /**
     * 改变menu选中项的回调
     */
    onChange?: (newSelectKey: string) => void
}

/**
 * 盒子模型，是border === width还是 content-width === width
 */
export enum BoxSizing {
    /**
     * border === width
     */
    BORDER = 'border',
    /**
     * content-width === width
     */
    CONTENT = 'content'
} 

export interface ToolItem {
    /**
     * key
     */
    key?: string, 
    /**
     * 组件的内容
     * key是被选中的菜单项目
     */
    content?: JSX.Element
    /**
     * 是否隐藏
     */
    hidden?: boolean
}

export interface TopBarProps extends ComponentProps {
    /**
     * 左上角的logo
     */
    logo?: React.ReactNode,
    /**
     * 左侧的菜单结构
     */
    menu?: Array<MenuItem>,
    /**
     * 右侧工具栏
     */
    tools?: Array<ToolItem>,
    /**
     * 用户信息部分，设置后会放在末尾
     */
    user?: false | React.ReactNode
    /**
     * 内容区域最大宽度
     */
    maxWidth?: string | number | false,
    /**
     * 盒子模型
     */
    boxSizing?: BoxSizing
}
