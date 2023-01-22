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
    index: number
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
     * tab按下的事件
     * @returns 
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>
}