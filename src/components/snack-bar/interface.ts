/* eslint-disable no-unused-vars */
export type SnackBarType = 'success' | 'error' | 'warning' | 'info'

export interface InfoConfig {
    type?: SnackBarType,
    duration?: number,
    isOpen?: boolean,
    content: string
}