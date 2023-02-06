/* eslint-disable no-unused-vars */
import TabBarItemController from '@components/tab-bar-item/controller'
import { ComponentProps } from '../../common/common.interface'
import { TabBarItemConfig } from '../tab-bar-item/interface'

export interface TabBarProps extends ComponentProps{
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
     * active的元素列表
     */
    active: TabBarItemConfig[],
    /**
     * tab点击的回调
     * @param active 新激活的tab index
     * @returns 
     */
    onTabClick?: (newActive: TabBarItemConfig) => void
}