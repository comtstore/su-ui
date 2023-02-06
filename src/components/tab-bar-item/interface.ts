/* eslint-disable no-unused-vars */
import { MouseEventHandler } from 'react'
import { ComponentProps } from '../../common/common.interface'
import TabBarItemController from './controller'

export interface TabBarItemConfig {
    [ key: string ]: any
}

export interface TabBarItemProps extends ComponentProps{
    /**
     * 当前激活的item列表
     */
    active: TabBarItemConfig[],
    /**
     * item
     */
    item: TabBarItemConfig,
    /**
     * tab data list
     */
    items: Array<TabBarItemConfig>,
    /**
     * key 字段
     */
    itemKey: string,
    /**
     * label 字段
    */
    itemLabel?: string,
    /**
     * secondLabel 字段
     */
    itemSecondLabel?: string | ((_item: TabBarItemConfig) => string),
    /**
     * 元素的位序
     */
    index: number,
    /**
    * 头部的icon
    */
    prependComponent?:  (data: {
        item: TabBarItemConfig,
        index: number
    }) => JSX.Element,
    /**
     * 尾部
     */
    appendComponent?: (data: {
        item: TabBarItemConfig,
        index: number,
        controller: TabBarItemController
    }) => JSX.Element,
    /**
     * label组件
     * @param data
     * @returns 
     */
    labelComponent?: (data: {
        item: TabBarItemConfig,
        index: number
    }) => JSX.Element,
    /**
     * tab按下的事件
     * @returns 
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>
}