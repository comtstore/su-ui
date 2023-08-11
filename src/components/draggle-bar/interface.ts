/* eslint-disable no-unused-vars */
import { ComponentProps } from '../../common/common.interface'

/**
 * 目前只支持竖着的拖动条
 */
export interface DraggleBarProps extends ComponentProps{
    /**
     * 组
     */
    group?: string,
    /**
     * 当被拖动时
     * @param e 
     * @returns 
     */
    onDragging?: (e) => void
}