/* eslint-disable no-unused-vars */
import { Component } from 'react'
import { ComponentProps } from '../../common/common.interface'

export interface MenuListItem {
    name?: string,
    icon?: Component,
    append?: Component,
    /**
     * 是否是空白
     */
    blank?: boolean
}

export interface MenuListProps extends ComponentProps{
    /**
     * 宽度
     */
    width?: number,
    /**
     * 所有选项
     */
    items: Array<MenuListItem>,
    /**
     * 激活的项目item
     */
    active?: MenuListItem | Array<MenuListItem> | null,
    /**
     * 项目被点击
     */
    onItemClick?: (item: MenuListItem) => void
}