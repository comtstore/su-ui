import React from "react"

export interface StatusTipItemConfig {
    /**
     * 状态名
     */
    name: string,
    /**
     * 处于该状态时所使用的颜色
     */
    color?: string,
    /**
     * 状态描述，在末尾用于指示当前状态给予的信息
     */
    desc?: string,
    /**
     * desc存在的时间，超过时间后自动隐藏desc，设置为0表示不隐藏
     */
    duration?: number,
    /**
     * 处于该状态时隐藏
     */
    hidden?: boolean,
    /**
     * 自定义显示内容
     */
    custom?: JSX.Element | React.Component
}

export interface StatusTipProps {
    /**
     * 当前所处于的状态
     */
    status: string,
    /**
     * 状态集合配置
     */
    items: Array<StatusTipItemConfig>
}