/* eslint-disable no-unused-vars */
import { ComponentProps } from '../../common/common.interface'
import { MouseEvent, TouchEvent } from 'react'

/**
 * 目前只支持竖着的拖动条
 */
export interface DraggleBarProps extends ComponentProps{
    onDragging?: (e) => void
}