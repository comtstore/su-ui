import { ReactNode } from "react"

/* eslint-disable no-unused-vars */
export type SnackBarType = 'success' | 'error' | 'warning' | 'info'

export interface InfoConfig {
    id?: string,
    replaceId?: string,
    type?: SnackBarType,
    duration?: number,
    isOpen?: boolean,
    content: string | ReactNode
}