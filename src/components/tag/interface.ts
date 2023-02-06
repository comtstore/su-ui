/* eslint-disable no-unused-vars */
import { ComponentProps } from '../../common/common.interface'

export interface TagProps extends ComponentProps{
    /**
     * 图标
     */
    icon?: () => JSX.Element,
    /**
     * label
     */
    label: string
}