/* eslint-disable no-unused-vars */
import { Component } from 'react'
import { ComponentProps } from '../../common/common.interface'

type TIcon = any

export interface MenuListItem {
    name?: string,
    icon?: TIcon,
    hide?: () => boolean,
    append?: Component,
    /**
     * 是否是空白
     */
    blank?: boolean
}

export interface MenuListProps extends ComponentProps{
    /**
     * 所有选项
     */
    items: Array<MenuListItem>,
    /**
     * key
     */
    itemKey: string,
    /**
     * label
     */
    itemLabel?: string,
    /**
     * 激活的项目item
     */
    active?: MenuListItem | Array<MenuListItem> | null,
    /**
     * icon组件的渲染器
     */
    iconComponent?: (icon: TIcon) => any,
    /**
     * 项目被点击
     */
    onItemClick?: (item: MenuListItem) => void
}